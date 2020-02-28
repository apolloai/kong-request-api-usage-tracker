/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/camelcase */
import fetch from 'node-fetch';
import { merge } from 'lodash';

// eslint-disable-next-line prettier/prettier
const availableServices = [
  'apollo-autoabstract-api',
  'apollo-autoabstract-api',
  'apollo-autoabstract-api',
  'apollo-extraction-api',
];
// eslint-disable-next-line prettier/prettier
const availableConsumers = [
  'consumer-1',
  'consumer-2',
  'consumer-3',
  'consumer-4',
  'consumer-5',
  'demo',
];

// eslint-disable-next-line prettier/prettier
const availableStatusCodes = [
  200,
  201,
  202,
  400,
  500,
  503,
];

const apiVersion = process.env.API_VERSION === '0' ? 0 : 1;

setInterval(() => {
  const log = {
    [apiVersion === 0 ? 'api' : 'service']: {
      name: availableServices[random(availableServices.length - 1)],
    },
    latencies: {
      proxy: random(2500, 150),
    },
    response: {
      status: availableStatusCodes[random(availableStatusCodes.length - 1)],
    },
    consumer: {
      username: availableConsumers[random(availableConsumers.length - 1)],
    },
  };
  console.log('simulate', log);
  fetch(process.env.ENDPOINT || 'http://localhost:3000/', {
    method: 'POST',
    headers: [['Content-Type', 'application/json']],
    body: JSON.stringify(merge({ ...templates[apiVersion] }, log)),
  }).catch();
}, 500);

function random(limit = 10, start = 0) {
  return Math.round(start + Math.random() * (limit - start));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const templates: any[] = [
  {
    api: {
      created_at: 1582898028171,
      strip_uri: true,
      id: '303cd272-dee5-48c6-af75-8e2267adbec2',
      hosts: ['api.apollo.ai'],
      name: 'kraut-debug',
      headers: { host: [Array] },
      http_if_terminated: false,
      https_only: false,
      retries: 5,
      uris: ['/metrics'],
      upstream_url: 'http://kraut.kong:3000',
      upstream_send_timeout: 60000,
      upstream_read_timeout: 60000,
      upstream_connect_timeout: 60000,
      preserve_host: true,
    },
    request: {
      querystring: {},
      size: '1160',
      uri: '/metrics',
      request_uri: 'http://api.apollo.ai:8000/metrics',
      method: 'GET',
      headers: {
        host: 'api.apollo.ai',
        connection: 'Keep-Alive',
        'upgrade-insecure-requests': '1',
        'cache-control': 'max-age=0',
        accept: 'text/html',
        'accept-language': 'en-US,en;q=0.9,de;q=0.8',
        'accept-encoding': 'gzip',
      },
    },
    client_ip: '42.43.44.45',
    latencies: { request: 16, kong: 9, proxy: 7 },
    response: {
      headers: {
        'x-kong-proxy-latency': '9',
        'content-type': 'text/plain; charset=utf-8',
        date: 'Fri, 28 Feb 2020 14:00:02 GMT',
        via: 'kong/0.11.2',
        connection: 'close',
        'x-kong-upstream-latency': '7',
        'access-control-allow-origin': '*',
        'content-length': '231',
      },
      status: 200,
      size: '476',
    },
    consumer: {
      username: 'demo',
      created_at: 1491847011000,
      id: '35b03bfc-7a5b-4a23-a594-aa350c585fa8',
    },
    tries: [{ balancer_latency: 0, port: 3000, ip: '10.42.244.74' }],
    started_at: 1582898402979,
  },
  {
    request: {
      method: 'GET',
      uri: '/get',
      url: 'http://httpbin.org:8000/get',
      size: '75',
      querystring: {},
      headers: {
        accept: '*/*',
        host: 'httpbin.org',
        'user-agent': 'curl/7.37.1',
      },
      tls: {
        version: 'TLSv1.2',
        cipher: 'ECDHE-RSA-AES256-GCM-SHA384',
        supported_client_ciphers: 'ECDHE-RSA-AES256-GCM-SHA384',
        client_verify: 'NONE',
      },
    },
    upstream_uri: '/',
    response: {
      status: 200,
      size: '434',
      headers: {
        'Content-Length': '197',
        via: 'kong/0.3.0',
        Connection: 'close',
        'access-control-allow-credentials': 'true',
        'Content-Type': 'application/json',
        server: 'nginx',
        'access-control-allow-origin': '*',
      },
    },
    tries: [
      {
        state: 'next',
        code: 502,
        ip: '127.0.0.1',
        port: 8000,
      },
      {
        ip: '127.0.0.1',
        port: 8000,
      },
    ],
    authenticated_entity: {
      consumer_id: '80f74eef-31b8-45d5-c525-ae532297ea8e',
      id: 'eaa330c0-4cff-47f5-c79e-b2e4f355207e',
    },
    route: {
      created_at: 1521555129,
      hosts: null,
      id: '75818c5f-202d-4b82-a553-6a46e7c9a19e',
      methods: null,
      paths: ['/example-path'],
      preserve_host: false,
      protocols: ['http', 'https'],
      regex_priority: 0,
      service: {
        id: '0590139e-7481-466c-bcdf-929adcaaf804',
      },
      strip_path: true,
      updated_at: 1521555129,
    },
    service: {
      connect_timeout: 60000,
      created_at: 1521554518,
      host: 'example.com',
      id: '0590139e-7481-466c-bcdf-929adcaaf804',
      name: 'myservice',
      path: '/',
      port: 80,
      protocol: 'http',
      read_timeout: 60000,
      retries: 5,
      updated_at: 1521554518,
      write_timeout: 60000,
    },
    workspaces: [
      {
        id: 'b7cac81a-05dc-41f5-b6dc-b87e29b6c3a3',
        name: 'default',
      },
    ],
    consumer: {
      username: 'demo',
      created_at: 1491847011000,
      id: '35b03bfc-7a5b-4a23-a594-aa350c585fa8',
    },
    latencies: {
      proxy: 1430,
      kong: 9,
      request: 1921,
    },
    client_ip: '127.0.0.1',
    started_at: 1433209822425,
  },
];
