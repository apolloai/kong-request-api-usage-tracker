import fetch from 'node-fetch';
// import { FastifyInstance } from 'fastify';

// import { setupServer } from '../src/server';
import { server } from '../src/index';

describe('KRAUT running server', () => {
  // let server: FastifyInstance;
  let serverUrl: string;

  beforeAll(done => {
    // server = setupServer();

    server.server.on('listening', () => {
      const address: any = server.server.address();
      serverUrl = 'http://localhost:' + address.port;
      done();
    });
  });
  afterAll(async () => server.close());

  test('return prometheus metrics', async () => {
    const response = await fetch(serverUrl, {
      method: 'GET',
    });

    expect(response.status).toEqual(200);
  });

  test('successfully log request', async () => {
    const response = await fetch(serverUrl, {
      method: 'POST',
    });

    expect(response.status).toEqual(202);
  });
});
