declare module '@via-profit-services/postgres' {
  import { Middleware } from '@via-profit-services/core';
  import { PoolClient, PoolConfig, Pool } from 'pg';

  export type Configuration = PoolConfig;

  export type MiddlewareFactory = (config: Configuration) => {
    pgPool: Pool;
    pgMiddleware: Middleware;
  };
}

declare module '@via-profit-services/core' {
  import { PoolClient, Notification } from 'pg';
  interface CoreEmitter {
    on(event: 'postgres-pool-connect', listener: (client: PoolClient) => void): this;
    once(event: 'postgres-pool-connect', listener: (client: PoolClient) => void): this;
    addListener(event: 'postgres-pool-connect', listener: (client: PoolClient) => void): this;
    removeListener(event: 'postgres-pool-connect', listener: (client: PoolClient) => void): this;
    prependListener(event: 'postgres-pool-connect', listener: (client: PoolClient) => void): this;
    prependOnceListener(
      event: 'postgres-pool-connect',
      listener: (client: PoolClient) => void,
    ): this;
    emit(event: 'postgres-pool-connect', ...args: [PoolClient]): boolean;
    removeAllListeners(event: 'postgres-pool-connect'): this;
    listeners(event: 'postgres-pool-connect'): Function[];
    listenerCount(event: 'postgres-pool-connect'): number;

    on(event: 'postgres-pool-acquire', listener: (client: PoolClient) => void): this;
    once(event: 'postgres-pool-acquire', listener: (client: PoolClient) => void): this;
    addListener(event: 'postgres-pool-acquire', listener: (client: PoolClient) => void): this;
    removeListener(event: 'postgres-pool-acquire', listener: (client: PoolClient) => void): this;
    prependListener(event: 'postgres-pool-acquire', listener: (client: PoolClient) => void): this;
    prependOnceListener(
      event: 'postgres-pool-acquire',
      listener: (client: PoolClient) => void,
    ): this;
    emit(event: 'postgres-pool-acquire', ...args: [PoolClient]): boolean;
    removeAllListeners(event: 'postgres-pool-acquire'): this;
    listeners(event: 'postgres-pool-acquire'): Function[];
    listenerCount(event: 'postgres-pool-acquire'): number;

    on(event: 'postgres-pool-remove', listener: (client: PoolClient) => void): this;
    once(event: 'postgres-pool-remove', listener: (client: PoolClient) => void): this;
    addListener(event: 'postgres-pool-remove', listener: (client: PoolClient) => void): this;
    removeListener(event: 'postgres-pool-remove', listener: (client: PoolClient) => void): this;
    prependListener(event: 'postgres-pool-remove', listener: (client: PoolClient) => void): this;
    prependOnceListener(
      event: 'postgres-pool-remove',
      listener: (client: PoolClient) => void,
    ): this;
    emit(event: 'postgres-pool-remove', ...args: [PoolClient]): boolean;
    removeAllListeners(event: 'postgres-pool-remove'): this;
    listeners(event: 'postgres-pool-remove'): Function[];
    listenerCount(event: 'postgres-pool-remove'): number;

    on(event: 'postgres-pool-error', listener: (err: Error, client: PoolClient) => void): this;
    once(event: 'postgres-pool-error', listener: (err: Error, client: PoolClient) => void): this;
    addListener(
      event: 'postgres-pool-error',
      listener: (err: Error, client: PoolClient) => void,
    ): this;
    removeListener(
      event: 'postgres-pool-error',
      listener: (err: Error, client: PoolClient) => void,
    ): this;
    prependListener(
      event: 'postgres-pool-error',
      listener: (err: Error, client: PoolClient) => void,
    ): this;
    prependOnceListener(
      event: 'postgres-pool-error',
      listener: (err: Error, client: PoolClient) => void,
    ): this;
    emit(event: 'postgres-pool-error', ...args: [Error, PoolClient]): boolean;
    removeAllListeners(event: 'postgres-pool-error'): this;
    listeners(event: 'postgres-pool-error'): Function[];
    listenerCount(event: 'postgres-pool-error'): number;

    on(event: 'postgres-error', listener: (err: Error) => void): this;
    once(event: 'postgres-error', listener: (err: Error) => void): this;
    addListener(event: 'postgres-error', listener: (err: Error) => void): this;
    removeListener(event: 'postgres-error', listener: (err: Error) => void): this;
    prependListener(event: 'postgres-error', listener: (err: Error) => void): this;
    prependOnceListener(event: 'postgres-error', listener: (err: Error) => void): this;
    emit(event: 'postgres-error', ...args: [Error]): boolean;
    removeAllListeners(event: 'postgres-error'): this;
    listeners(event: 'postgres-error'): Function[];
    listenerCount(event: 'postgres-error'): number;

    on(event: 'postgres-end', listener: () => void): this;
    once(event: 'postgres-end', listener: () => void): this;
    addListener(event: 'postgres-end', listener: () => void): this;
    removeListener(event: 'postgres-end', listener: () => void): this;
    prependListener(event: 'postgres-end', listener: () => void): this;
    prependOnceListener(event: 'postgres-end', listener: () => void): this;
    emit(event: 'postgres-end'): boolean;
    removeAllListeners(event: 'postgres-end'): this;
    listeners(event: 'postgres-end'): Function[];
    listenerCount(event: 'postgres-end'): number;

    on(event: 'postgres-notice', listener: (notice: any) => void): this;
    once(event: 'postgres-notice', listener: (notice: any) => void): this;
    addListener(event: 'postgres-notice', listener: (notice: any) => void): this;
    removeListener(event: 'postgres-notice', listener: (notice: any) => void): this;
    prependListener(event: 'postgres-notice', listener: (notice: any) => void): this;
    prependOnceListener(event: 'postgres-notice', listener: (notice: any) => void): this;
    emit(event: 'postgres-notice', ...args: [any]): boolean;
    removeAllListeners(event: 'postgres-notice'): this;
    listeners(event: 'postgres-notice'): Function[];
    listenerCount(event: 'postgres-notice'): number;

    on(event: 'postgres-notification', listener: (notification: Notification) => void): this;
    once(event: 'postgres-notification', listener: (notification: Notification) => void): this;
    addListener(
      event: 'postgres-notification',
      listener: (notification: Notification) => void,
    ): this;
    removeListener(
      event: 'postgres-notification',
      listener: (notification: Notification) => void,
    ): this;
    prependListener(
      event: 'postgres-notification',
      listener: (notification: Notification) => void,
    ): this;
    prependOnceListener(
      event: 'postgres-notification',
      listener: (notification: Notification) => void,
    ): this;
    emit(event: 'postgres-notification', ...args: [Notification]): boolean;
    removeAllListeners(event: 'postgres-notification'): this;
    listeners(event: 'postgres-notification'): Function[];
    listenerCount(event: 'postgres-notification'): number;
  }

  interface Context {
    postgres: PoolClient;
  }
}
