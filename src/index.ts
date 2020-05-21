import * as fastify from 'fastify';
import { register, Counter, Histogram } from 'prom-client';
import { get, compact } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function harmonizeStatusCode(input: any) {
  const code = parseInt(input);
  return (Math.round(code / 100) * 100).toString();
}

const server = fastify({
  logger: process.env.LOG_LEVEL ? { level: process.env.LOG_LEVEL } : !!process.env.DEBUG,
});

const apiUsageCounter = new Counter({
  name: 'kong_api_usage_counter',
  help: 'Counter of the kong API usage',
  labelNames: ['api', 'status', 'consumer'],
});
const apiUsageHistogram = new Histogram({
  name: 'kong_api_usage_histogram',
  help: 'Histogram of the kong API usage',
  labelNames: ['api', 'status'],
  buckets: [50, 100, 300, 500, 1000, 2500, 5000, 10000],
});

// Declare a route
server.get('/', (request, reply) => {
  reply.send(register.metrics());
});

server.post('/', (request, reply) => {
  const service = get(request.body, 'service.name', get(request.body, 'api.name'));
  const status = get(request.body, 'response.status') || 200;
  const latency = get(request.body, 'latencies.proxy');
  const consumer = get(request.body, 'consumer.username', get(request.body, 'consumer.id', '__anonymous__'));
  if (service) {
    server.log.trace(`log request to "${service}"`);
    try {
      const labels = compact([service, status, consumer]);
      apiUsageCounter.labels(...labels).inc();
      if (latency) {
        apiUsageHistogram.labels(service, harmonizeStatusCode(status)).observe(latency);
      }
    } catch (error) {
      server.log.error('Failed to log: ' + error);
    }
  }
  reply.status(202).send({
    status: 202,
    message: 'log was processed',
  });
});

// Run the server!
server
  .listen(Number(process.env.PORT) || 3000, '0.0.0.0')
  .then(address => console.log(`server listening on ${address}`))
  .catch(err => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  });
