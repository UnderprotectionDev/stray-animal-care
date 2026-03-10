import * as migration_20260310_081833_add_localization from './20260310_081833_add_localization';
import * as migration_20260310_091217_m4_collections from './20260310_091217_m4_collections';
import * as migration_20260310_120000_fix_animals_status from './20260310_120000_fix_animals_status';
import * as migration_20260310_194500_remove_supporter_comments from './20260310_194500_remove_supporter_comments';

export const migrations = [
  {
    up: migration_20260310_081833_add_localization.up,
    down: migration_20260310_081833_add_localization.down,
    name: '20260310_081833_add_localization',
  },
  {
    up: migration_20260310_091217_m4_collections.up,
    down: migration_20260310_091217_m4_collections.down,
    name: '20260310_091217_m4_collections',
  },
  {
    up: migration_20260310_120000_fix_animals_status.up,
    down: migration_20260310_120000_fix_animals_status.down,
    name: '20260310_120000_fix_animals_status',
  },
  {
    up: migration_20260310_194500_remove_supporter_comments.up,
    down: migration_20260310_194500_remove_supporter_comments.down,
    name: '20260310_194500_remove_supporter_comments',
  },
];
