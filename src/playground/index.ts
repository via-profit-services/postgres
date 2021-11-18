/* eslint-disable no-console */
import { createServer } from 'http';
import express from 'express';
import * as core from '@via-profit-services/core';
import { makeExecutableSchema } from '@graphql-tools/schema';

import typeDefs from './schema.graphql';
import resolvers from './resolvers';
import postgres from '../index';

(async () => {
  const port = 9005;
  const app = express();
  const server = createServer(app);

  const postgresMiddleware = await postgres({
    user: 'tlktransfer',
    database: 'tlktransfer_server',
    password: 'admin',
    host: 'localhost',
  });

  const schema = makeExecutableSchema({
    typeDefs: [core.typeDefs, typeDefs],
    resolvers: [core.resolvers, resolvers],
  });

  const { graphQLExpress } = await core.factory({
    server,
    schema,
    middleware: [
      ({ context, requestCounter }) => {
        if (requestCounter === 1) {
          context.emitter.on('postgres-pool-connect', () => console.info('[log] pool connected'));
          context.emitter.on('postgres-pool-error', err => console.error('[log] pool error', err));
          context.emitter.on('postgres-error', err => console.error('[log] error', err));
          context.emitter.on('postgres-end', () => console.error('[log] end'));
        }

        return {
          context,
        };
      },
      postgresMiddleware,
    ],
  });

  app.use('/graphql', graphQLExpress);

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.info(`GraphQL server started at port ${port}`);
  });
})();
