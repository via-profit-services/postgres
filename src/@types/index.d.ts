declare module '@via-profit-services/postgres' {
  import { Middleware, CoreEmitter } from '@via-profit-services/core';
  import { PoolClient, PoolConfig } from 'pg';

  export type Configuration = PoolConfig;

  export type MiddlewareFactory = (config: Configuration) => Promise<Middleware>;

  export type PostgresProvider = (props: PostgresProviderProps) => Promise<PoolClient>;

  export interface PostgresProviderProps {
    config: Configuration;
    emitter: CoreEmitter;
  }
}

declare module '@via-profit-services/core' {
  import '@via-profit-services/core/dist/index';
  import { PoolClient, Notification } from 'pg';
  interface CoreEmitter {
    on(event: 'postgres-pool-connect', listener: (client: PoolClient) => void): this;
    on(event: 'postgres-pool-acquire', listener: (client: PoolClient) => void): this;
    on(event: 'postgres-pool-remove', listener: (client: PoolClient) => void): this;
    on(event: 'postgres-pool-error', listener: (err: Error, client: PoolClient) => void): this;
    on(event: 'postgres-error', listener: (err: Error) => void): this;
    on(event: 'postgres-end', listener: () => void): this;
    on(event: 'postgres-notice', listener: (notice: Error) => void): this;
    on(event: 'postgres-notification', listener: (notification: Notification) => void): this;
    
    once(event: 'postgres-pool-connect', listener: (client: PoolClient) => void): this;
    once(event: 'postgres-pool-acquire', listener: (client: PoolClient) => void): this;
    once(event: 'postgres-pool-remove', listener: (client: PoolClient) => void): this;
    once(event: 'postgres-pool-error', listener: (err: Error, client: PoolClient) => void): this;
    once(event: 'postgres-error', listener: (err: Error) => void): this;
    once(event: 'postgres-end', listener: () => void): this;
    once(event: 'postgres-notice', listener: (notice: Error) => void): this;
    once(
      event: 'postgres-notification',
      listener: (notification: Notification) => void,
    ): this;
  }

  interface Context {
    postgres: PoolClient;
  }
}
