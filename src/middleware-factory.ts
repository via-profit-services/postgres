import type { MiddlewareFactory } from '@via-profit-services/postgres';
import { Middleware } from '@via-profit-services/core';
import { Pool } from 'pg';

const factory: MiddlewareFactory = config => {
  const pgPool = new Pool(config);

  const pgMiddleware: Middleware = async ({ context, stats }) => {
    if (stats.requestCounter === 1) {
      context.postgres = await pgPool.connect();
      pgPool.on('connect', client => context.emitter.emit('postgres-pool-connect', client));
      pgPool.on('acquire', client => context.emitter.emit('postgres-pool-acquire', client));
      pgPool.on('remove', client => context.emitter.emit('postgres-pool-remove', client));
      pgPool.on('error', (err, client) => context.emitter.emit('postgres-pool-error', err, client));
      context.postgres.on('error', err => context.emitter.emit('postgres-error', err));
      context.postgres.on('end', () => context.emitter.emit('postgres-end'));
      context.postgres.on('notice', notice => context.emitter.emit('postgres-notice', notice));
      context.postgres.on('notification', notification =>
        context.emitter.emit('postgres-notification', notification),
      );
    }
  };

  return {
    pgPool,
    pgMiddleware,
  };
};

export default factory;
