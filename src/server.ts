import * as fastify from 'fastify';
import { register, Counter, Histogram } from 'prom-client';
import { get, compact } from 'lodash';

function harmonizeStatusCode(input: string | number) {
  return (Math.round(Number(input) / 100) * 100).toString();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setupServer(logger: any = false) {
  const server = fastify({
    logger,
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

  return server;
}
