/* istanbul ignore file */

import fetch from 'node-fetch';
import { generateLog } from './log.generator';

setInterval(() => {
  const log = generateLog({ apiVersion: process.env.API_VERSION === '0' ? 0 : 1 });
  console.log('simulate', log);
  fetch(process.env.ENDPOINT || 'http://localhost:3000/', {
    method: 'POST',
    headers: [['Content-Type', 'application/json']],
    body: JSON.stringify(log),
  }).catch();
}, 500);
