import type { MiddlewareFactory } from '@via-profit-services/postgres';
import { Middleware } from '@via-profit-services/core';

import provider from './provider';

const factory: MiddlewareFactory = async config => {
  const middleware: Middleware = async ({ context }) => {
    context.postgres = await provider({
      config,
      emitter: context.emitter,
    });

    return {
      context,
    };
  };

  return middleware;
};

export default factory;
