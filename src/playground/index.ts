/* eslint-disable no-console */
import http from 'node:http';
import { graphqlHTTPFactory } from '@via-profit-services/core';

import postgres from '../index';
import schema from './schema';

(async () => {
  const port = 9005;
  const server = http.createServer();

  const { pgMiddleware } = postgres({
    user: 'tlktransfer',
    database: 'tlktransfer_server',
    password: 'admin',
    host: 'localhost',
  });

  const httpListener = graphqlHTTPFactory({
    schema,
    middleware: [
      ({ context, stats }) => {
        if (stats.requestCounter === 1) {
          context.emitter.on('postgres-pool-connect', () => console.info('[log] pool connected'));
          context.emitter.on('postgres-pool-error', err => console.error('[log] pool error', err));
          context.emitter.on('postgres-error', err => console.error('[log] error', err));
          context.emitter.on('postgres-end', () => console.error('[log] end'));
        }
      },
      pgMiddleware,
    ],
  });

  server.on('request', httpListener);
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.info(`GraphQL server started at port ${port}`);
  });
})();
