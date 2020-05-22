import { omit } from 'lodash';
import { Histogram } from 'prom-client';
import { FastifyInstance } from 'fastify';

import { setupServer } from './server';
import { generateLog } from '../__tests__/samples/helpers/log.generator';

describe('KRAUT server', () => {
  let server: FastifyInstance;

  beforeAll(() => (server = setupServer()));
  afterAll(async () => server.close());

  test('return prometheus metrics', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.statusCode).toEqual(200);
  });

  test('successfully log request', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/',
      headers: {
        'content-type': 'application/json',
      },
      payload: JSON.stringify(generateLog()),
    });

    expect(response.statusCode).toEqual(202);
  });

  // TODO: add edge and error cases
  test('in case prom client somehow would fail', async () => {
    const spy = jest.spyOn(Histogram.prototype, 'labels').mockImplementationOnce(() => {
      throw new Error('incorrect labels');
    });

    const response = await server.inject({
      method: 'POST',
      url: '/',
      headers: {
        'content-type': 'application/json',
      },
      payload: JSON.stringify(generateLog()),
    });

    expect(response.statusCode).toEqual(202);

    spy.mockRestore();
  });

  test('ignore empty request', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/',
      headers: {
        'content-type': 'application/json',
      },
      payload: JSON.stringify({}),
    });

    expect(response.statusCode).toEqual(202);
  });

  test('successfully log request - even without latency', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/',
      headers: {
        'content-type': 'application/json',
      },
      payload: JSON.stringify(omit(generateLog(), 'latencies.proxy')),
    });

    expect(response.statusCode).toEqual(202);
  });
});
