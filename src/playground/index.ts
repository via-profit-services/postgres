/* eslint-disable no-console */
import express from 'express';
import * as core from '@via-profit-services/core';

import postgres from '../index';
import schema from './schema';

(async () => {
  const port = 9005;
  const app = express();

  const postgresMiddleware = await postgres({
    user: 'tlktransfer',
    database: 'tlktransfer_server',
    password: 'admin',
    host: 'localhost',
  });

  const graphQLExpress = await core.graphqlExpressFactory({
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
      postgresMiddleware,
    ],
  });

  app.use('/graphql', graphQLExpress);

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.info(`GraphQL server started at port ${port}`);
  });
})();
