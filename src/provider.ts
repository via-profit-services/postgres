import { Pool, PoolClient } from 'pg';
import type { PostgresProvider } from '@via-profit-services/postgres';

type State = {
  pool: Pool;
  client: PoolClient;
  connected: boolean;
};

const state: State = {
  pool: null,
  client: null,
  connected: false,
};

const provider: PostgresProvider = async ({ config, emitter }) => {
  if (state.connected) {
    return state.client;
  }

  state.pool = new Pool(config);
  state.pool.on('connect', client => emitter.emit('postgres-pool-connect', client));
  state.pool.on('acquire', client => emitter.emit('postgres-pool-acquire', client));
  state.pool.on('remove', client => emitter.emit('postgres-pool-remove', client));
  state.pool.on('error', err => emitter.emit('postgres-pool-error', err));

  try {
    const client = await state.pool.connect();
    client.on('error', err => emitter.emit('postgres-error', err));
    client.on('end', () => emitter.emit('postgres-error'));
    client.on('notice', () => emitter.emit('postgres-notice'));
    client.on('notification', notification => emitter.emit('postgres-notification', notification));

    state.client = client;
    state.connected = true;
  } catch (err) {
    emitter.emit('postgres-error', err);
  }

  return state.client;
};

export default provider;
