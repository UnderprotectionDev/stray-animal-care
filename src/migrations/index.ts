import * as migration_20260310_081833_add_localization from './20260310_081833_add_localization';
import * as migration_20260310_091217_m4_collections from './20260310_091217_m4_collections';

export const migrations = [
  {
    up: migration_20260310_081833_add_localization.up,
    down: migration_20260310_081833_add_localization.down,
    name: '20260310_081833_add_localization',
  },
  {
    up: migration_20260310_091217_m4_collections.up,
    down: migration_20260310_091217_m4_collections.down,
    name: '20260310_091217_m4_collections'
  },
];
