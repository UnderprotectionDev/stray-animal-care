import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_supporter_comments_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_supporter_comments_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "supporter_comments_id";
    DROP TABLE IF EXISTS "supporter_comments_locales" CASCADE;
    DROP TABLE IF EXISTS "supporter_comments" CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "supporter_comments" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "date" timestamp(3) with time zone,
      "approved" boolean DEFAULT false,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "supporter_comments_locales" (
      "comment" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    ALTER TABLE "supporter_comments_locales" ADD CONSTRAINT "supporter_comments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."supporter_comments"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX IF NOT EXISTS "supporter_comments_updated_at_idx" ON "supporter_comments" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "supporter_comments_created_at_idx" ON "supporter_comments" USING btree ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "supporter_comments_locales_locale_parent_id_unique" ON "supporter_comments_locales" USING btree ("_locale","_parent_id");

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "supporter_comments_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_supporter_comments_fk" FOREIGN KEY ("supporter_comments_id") REFERENCES "public"."supporter_comments"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_supporter_comments_id_idx" ON "payload_locked_documents_rels" USING btree ("supporter_comments_id");
  `)
}
