import { setupServer } from './server';

/* istanbul ignore next */
const logConfig = process.env.LOG_LEVEL ? { level: process.env.LOG_LEVEL } : !!process.env.DEBUG;

export const server = setupServer(logConfig);

// Run the server!
server
  .listen(Number(process.env.PORT) || 3000, '0.0.0.0')
  .then(address => console.log(`server listening on ${address}`))
  .catch(err => /* istanbul ignore next */ {
    server.log.error(err);
    process.exit(1);
  });
