import * as migration_20260311_132448_init from './20260311_132448_init';

export const migrations = [
  {
    up: migration_20260311_132448_init.up,
    down: migration_20260311_132448_init.down,
    name: '20260311_132448_init'
  },
];
