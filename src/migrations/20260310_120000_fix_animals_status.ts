import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_animals_animal_status" AS ENUM('tedavide', 'kalici-bakim', 'acil');
    CREATE TYPE "public"."enum__animals_v_version_animal_status" AS ENUM('tedavide', 'kalici-bakim', 'acil');

    ALTER TABLE "animals" ADD COLUMN "animal_status" "enum_animals_animal_status";
    ALTER TABLE "_animals_v" ADD COLUMN "version_animal_status" "enum__animals_v_version_animal_status";

    UPDATE "animals" SET "animal_status" = "status"::text::"enum_animals_animal_status" WHERE "status" IS NOT NULL;
    UPDATE "_animals_v" SET "version_animal_status" = "version_status"::text::"enum__animals_v_version_animal_status" WHERE "version_status" IS NOT NULL;

    ALTER TABLE "animals" DROP COLUMN IF EXISTS "status";
    ALTER TABLE "_animals_v" DROP COLUMN IF EXISTS "version_status";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE IF NOT EXISTS "public"."enum_animals_status" AS ENUM('tedavide', 'kalici-bakim', 'acil');
    CREATE TYPE IF NOT EXISTS "public"."enum__animals_v_version_status" AS ENUM('tedavide', 'kalici-bakim', 'acil');

    ALTER TABLE "animals" ADD COLUMN "status" "enum_animals_status";
    ALTER TABLE "_animals_v" ADD COLUMN "version_status" "enum__animals_v_version_status";

    UPDATE "animals" SET "status" = "animal_status"::text::"enum_animals_status" WHERE "animal_status" IS NOT NULL;
    UPDATE "_animals_v" SET "version_status" = "version_animal_status"::text::"enum__animals_v_version_status" WHERE "version_animal_status" IS NOT NULL;

    ALTER TABLE "animals" DROP COLUMN IF EXISTS "animal_status";
    ALTER TABLE "_animals_v" DROP COLUMN IF EXISTS "version_animal_status";

    DROP TYPE IF EXISTS "public"."enum_animals_animal_status";
    DROP TYPE IF EXISTS "public"."enum__animals_v_version_animal_status";
  `)
}
