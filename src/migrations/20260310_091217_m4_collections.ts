import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_post_category" AS ENUM('kurtarma', 'tedavi', 'gunluk', 'duyuru', 'etkinlik');
  CREATE TYPE "public"."enum__posts_v_version_post_category" AS ENUM('kurtarma', 'tedavi', 'gunluk', 'duyuru', 'etkinlik');
  CREATE TYPE "public"."enum_animals_type" AS ENUM('kedi', 'kopek');
  CREATE TYPE "public"."enum_animals_gender" AS ENUM('erkek', 'disi', 'bilinmiyor');
  CREATE TYPE "public"."enum_animals_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__animals_v_version_type" AS ENUM('kedi', 'kopek');
  CREATE TYPE "public"."enum__animals_v_version_gender" AS ENUM('erkek', 'disi', 'bilinmiyor');
  CREATE TYPE "public"."enum__animals_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__animals_v_published_locale" AS ENUM('tr', 'en');
  CREATE TYPE "public"."enum_emergency_cases_case_status" AS ENUM('aktif', 'tamamlandi');
  CREATE TYPE "public"."enum_emergency_cases_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__emergency_cases_v_version_case_status" AS ENUM('aktif', 'tamamlandi');
  CREATE TYPE "public"."enum__emergency_cases_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__emergency_cases_v_published_locale" AS ENUM('tr', 'en');
  CREATE TYPE "public"."enum_needs_list_urgency" AS ENUM('acil', 'orta', 'yeterli');
  CREATE TABLE "posts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "_posts_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "animals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_animals_type",
  	"gender" "enum_animals_gender",
  	"status" "enum_animals_status",
  	"featured" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_animals_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "animals_locales" (
  	"name" varchar,
  	"story" jsonb,
  	"needs" jsonb,
  	"age" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "animals_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_animals_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_type" "enum__animals_v_version_type",
  	"version_gender" "enum__animals_v_version_gender",
  	"version_status" "enum__animals_v_version_status",
  	"version_featured" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__animals_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__animals_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_animals_v_locales" (
  	"version_name" varchar,
  	"version_story" jsonb,
  	"version_needs" jsonb,
  	"version_age" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_animals_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "emergency_cases_updates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"photo_id" integer
  );
  
  CREATE TABLE "emergency_cases_updates_locales" (
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "emergency_cases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"animal_id" integer,
  	"before_photo_id" integer,
  	"after_photo_id" integer,
  	"target_amount" numeric,
  	"collected_amount" numeric DEFAULT 0,
  	"case_status" "enum_emergency_cases_case_status" DEFAULT 'aktif',
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_emergency_cases_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "emergency_cases_locales" (
  	"title" varchar,
  	"description" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "emergency_cases_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_emergency_cases_v_version_updates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_emergency_cases_v_version_updates_locales" (
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_emergency_cases_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_animal_id" integer,
  	"version_before_photo_id" integer,
  	"version_after_photo_id" integer,
  	"version_target_amount" numeric,
  	"version_collected_amount" numeric DEFAULT 0,
  	"version_case_status" "enum__emergency_cases_v_version_case_status" DEFAULT 'aktif',
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__emergency_cases_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__emergency_cases_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_emergency_cases_v_locales" (
  	"version_title" varchar,
  	"version_description" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_emergency_cases_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "needs_list" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"urgency" "enum_needs_list_urgency" NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "needs_list_locales" (
  	"product_name" varchar NOT NULL,
  	"brand_detail" varchar,
  	"stock_status" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "transparency_reports_expenses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"amount" numeric
  );
  
  CREATE TABLE "transparency_reports_expenses_locales" (
  	"category" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "transparency_reports_donor_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"amount" numeric
  );
  
  CREATE TABLE "transparency_reports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"month" timestamp(3) with time zone NOT NULL,
  	"total_expense" numeric,
  	"total_donation" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "transparency_reports_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "transparency_reports_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "supporter_comments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"approved" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "supporter_comments_locales" (
  	"comment" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"bank_name" varchar,
  	"account_holder" varchar,
  	"iban" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"whatsapp" varchar,
  	"instagram" varchar,
  	"paypal_link" varchar,
  	"wise_link" varchar,
  	"cats_count" numeric DEFAULT 0,
  	"dogs_count" numeric DEFAULT 0,
  	"treated_count" numeric DEFAULT 0,
  	"spayed_count" numeric DEFAULT 0,
  	"vaccinated_count" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "posts" ADD COLUMN "post_category" "enum_posts_post_category";
  ALTER TABLE "posts_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "posts_locales" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_post_category" "enum__posts_v_version_post_category";
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "redirects_rels" ADD COLUMN "animals_id" integer;
  ALTER TABLE "redirects_rels" ADD COLUMN "emergency_cases_id" integer;
  ALTER TABLE "search_rels" ADD COLUMN "animals_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "animals_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "emergency_cases_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "needs_list_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "transparency_reports_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "supporter_comments_id" integer;
  ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_tags" ADD CONSTRAINT "_posts_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "animals_locales" ADD CONSTRAINT "animals_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "animals_locales" ADD CONSTRAINT "animals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."animals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "animals_rels" ADD CONSTRAINT "animals_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."animals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "animals_rels" ADD CONSTRAINT "animals_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_animals_v" ADD CONSTRAINT "_animals_v_parent_id_animals_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."animals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_animals_v_locales" ADD CONSTRAINT "_animals_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_animals_v_locales" ADD CONSTRAINT "_animals_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_animals_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_animals_v_rels" ADD CONSTRAINT "_animals_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_animals_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_animals_v_rels" ADD CONSTRAINT "_animals_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "emergency_cases_updates" ADD CONSTRAINT "emergency_cases_updates_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "emergency_cases_updates" ADD CONSTRAINT "emergency_cases_updates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."emergency_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "emergency_cases_updates_locales" ADD CONSTRAINT "emergency_cases_updates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."emergency_cases_updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "emergency_cases" ADD CONSTRAINT "emergency_cases_animal_id_animals_id_fk" FOREIGN KEY ("animal_id") REFERENCES "public"."animals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "emergency_cases" ADD CONSTRAINT "emergency_cases_before_photo_id_media_id_fk" FOREIGN KEY ("before_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "emergency_cases" ADD CONSTRAINT "emergency_cases_after_photo_id_media_id_fk" FOREIGN KEY ("after_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "emergency_cases_locales" ADD CONSTRAINT "emergency_cases_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "emergency_cases_locales" ADD CONSTRAINT "emergency_cases_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."emergency_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "emergency_cases_rels" ADD CONSTRAINT "emergency_cases_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."emergency_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "emergency_cases_rels" ADD CONSTRAINT "emergency_cases_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_emergency_cases_v_version_updates" ADD CONSTRAINT "_emergency_cases_v_version_updates_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_emergency_cases_v_version_updates" ADD CONSTRAINT "_emergency_cases_v_version_updates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_emergency_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_emergency_cases_v_version_updates_locales" ADD CONSTRAINT "_emergency_cases_v_version_updates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_emergency_cases_v_version_updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_emergency_cases_v" ADD CONSTRAINT "_emergency_cases_v_parent_id_emergency_cases_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."emergency_cases"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_emergency_cases_v" ADD CONSTRAINT "_emergency_cases_v_version_animal_id_animals_id_fk" FOREIGN KEY ("version_animal_id") REFERENCES "public"."animals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_emergency_cases_v" ADD CONSTRAINT "_emergency_cases_v_version_before_photo_id_media_id_fk" FOREIGN KEY ("version_before_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_emergency_cases_v" ADD CONSTRAINT "_emergency_cases_v_version_after_photo_id_media_id_fk" FOREIGN KEY ("version_after_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_emergency_cases_v_locales" ADD CONSTRAINT "_emergency_cases_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_emergency_cases_v_locales" ADD CONSTRAINT "_emergency_cases_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_emergency_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_emergency_cases_v_rels" ADD CONSTRAINT "_emergency_cases_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_emergency_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_emergency_cases_v_rels" ADD CONSTRAINT "_emergency_cases_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "needs_list_locales" ADD CONSTRAINT "needs_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."needs_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transparency_reports_expenses" ADD CONSTRAINT "transparency_reports_expenses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."transparency_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transparency_reports_expenses_locales" ADD CONSTRAINT "transparency_reports_expenses_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."transparency_reports_expenses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transparency_reports_donor_list" ADD CONSTRAINT "transparency_reports_donor_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."transparency_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transparency_reports_locales" ADD CONSTRAINT "transparency_reports_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."transparency_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transparency_reports_rels" ADD CONSTRAINT "transparency_reports_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."transparency_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transparency_reports_rels" ADD CONSTRAINT "transparency_reports_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "supporter_comments_locales" ADD CONSTRAINT "supporter_comments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."supporter_comments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_tags_order_idx" ON "posts_tags" USING btree ("_order");
  CREATE INDEX "posts_tags_parent_id_idx" ON "posts_tags" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_tags_order_idx" ON "_posts_v_version_tags" USING btree ("_order");
  CREATE INDEX "_posts_v_version_tags_parent_id_idx" ON "_posts_v_version_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "animals_slug_idx" ON "animals" USING btree ("slug");
  CREATE INDEX "animals_updated_at_idx" ON "animals" USING btree ("updated_at");
  CREATE INDEX "animals_created_at_idx" ON "animals" USING btree ("created_at");
  CREATE INDEX "animals__status_idx" ON "animals" USING btree ("_status");
  CREATE INDEX "animals_meta_meta_image_idx" ON "animals_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "animals_locales_locale_parent_id_unique" ON "animals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "animals_rels_order_idx" ON "animals_rels" USING btree ("order");
  CREATE INDEX "animals_rels_parent_idx" ON "animals_rels" USING btree ("parent_id");
  CREATE INDEX "animals_rels_path_idx" ON "animals_rels" USING btree ("path");
  CREATE INDEX "animals_rels_media_id_idx" ON "animals_rels" USING btree ("media_id");
  CREATE INDEX "_animals_v_parent_idx" ON "_animals_v" USING btree ("parent_id");
  CREATE INDEX "_animals_v_version_version_slug_idx" ON "_animals_v" USING btree ("version_slug");
  CREATE INDEX "_animals_v_version_version_updated_at_idx" ON "_animals_v" USING btree ("version_updated_at");
  CREATE INDEX "_animals_v_version_version_created_at_idx" ON "_animals_v" USING btree ("version_created_at");
  CREATE INDEX "_animals_v_version_version__status_idx" ON "_animals_v" USING btree ("version__status");
  CREATE INDEX "_animals_v_created_at_idx" ON "_animals_v" USING btree ("created_at");
  CREATE INDEX "_animals_v_updated_at_idx" ON "_animals_v" USING btree ("updated_at");
  CREATE INDEX "_animals_v_snapshot_idx" ON "_animals_v" USING btree ("snapshot");
  CREATE INDEX "_animals_v_published_locale_idx" ON "_animals_v" USING btree ("published_locale");
  CREATE INDEX "_animals_v_latest_idx" ON "_animals_v" USING btree ("latest");
  CREATE INDEX "_animals_v_autosave_idx" ON "_animals_v" USING btree ("autosave");
  CREATE INDEX "_animals_v_version_meta_version_meta_image_idx" ON "_animals_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_animals_v_locales_locale_parent_id_unique" ON "_animals_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_animals_v_rels_order_idx" ON "_animals_v_rels" USING btree ("order");
  CREATE INDEX "_animals_v_rels_parent_idx" ON "_animals_v_rels" USING btree ("parent_id");
  CREATE INDEX "_animals_v_rels_path_idx" ON "_animals_v_rels" USING btree ("path");
  CREATE INDEX "_animals_v_rels_media_id_idx" ON "_animals_v_rels" USING btree ("media_id");
  CREATE INDEX "emergency_cases_updates_order_idx" ON "emergency_cases_updates" USING btree ("_order");
  CREATE INDEX "emergency_cases_updates_parent_id_idx" ON "emergency_cases_updates" USING btree ("_parent_id");
  CREATE INDEX "emergency_cases_updates_photo_idx" ON "emergency_cases_updates" USING btree ("photo_id");
  CREATE UNIQUE INDEX "emergency_cases_updates_locales_locale_parent_id_unique" ON "emergency_cases_updates_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "emergency_cases_animal_idx" ON "emergency_cases" USING btree ("animal_id");
  CREATE INDEX "emergency_cases_before_photo_idx" ON "emergency_cases" USING btree ("before_photo_id");
  CREATE INDEX "emergency_cases_after_photo_idx" ON "emergency_cases" USING btree ("after_photo_id");
  CREATE UNIQUE INDEX "emergency_cases_slug_idx" ON "emergency_cases" USING btree ("slug");
  CREATE INDEX "emergency_cases_updated_at_idx" ON "emergency_cases" USING btree ("updated_at");
  CREATE INDEX "emergency_cases_created_at_idx" ON "emergency_cases" USING btree ("created_at");
  CREATE INDEX "emergency_cases__status_idx" ON "emergency_cases" USING btree ("_status");
  CREATE INDEX "emergency_cases_meta_meta_image_idx" ON "emergency_cases_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "emergency_cases_locales_locale_parent_id_unique" ON "emergency_cases_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "emergency_cases_rels_order_idx" ON "emergency_cases_rels" USING btree ("order");
  CREATE INDEX "emergency_cases_rels_parent_idx" ON "emergency_cases_rels" USING btree ("parent_id");
  CREATE INDEX "emergency_cases_rels_path_idx" ON "emergency_cases_rels" USING btree ("path");
  CREATE INDEX "emergency_cases_rels_media_id_idx" ON "emergency_cases_rels" USING btree ("media_id");
  CREATE INDEX "_emergency_cases_v_version_updates_order_idx" ON "_emergency_cases_v_version_updates" USING btree ("_order");
  CREATE INDEX "_emergency_cases_v_version_updates_parent_id_idx" ON "_emergency_cases_v_version_updates" USING btree ("_parent_id");
  CREATE INDEX "_emergency_cases_v_version_updates_photo_idx" ON "_emergency_cases_v_version_updates" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_emergency_cases_v_version_updates_locales_locale_parent_id_" ON "_emergency_cases_v_version_updates_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_emergency_cases_v_parent_idx" ON "_emergency_cases_v" USING btree ("parent_id");
  CREATE INDEX "_emergency_cases_v_version_version_animal_idx" ON "_emergency_cases_v" USING btree ("version_animal_id");
  CREATE INDEX "_emergency_cases_v_version_version_before_photo_idx" ON "_emergency_cases_v" USING btree ("version_before_photo_id");
  CREATE INDEX "_emergency_cases_v_version_version_after_photo_idx" ON "_emergency_cases_v" USING btree ("version_after_photo_id");
  CREATE INDEX "_emergency_cases_v_version_version_slug_idx" ON "_emergency_cases_v" USING btree ("version_slug");
  CREATE INDEX "_emergency_cases_v_version_version_updated_at_idx" ON "_emergency_cases_v" USING btree ("version_updated_at");
  CREATE INDEX "_emergency_cases_v_version_version_created_at_idx" ON "_emergency_cases_v" USING btree ("version_created_at");
  CREATE INDEX "_emergency_cases_v_version_version__status_idx" ON "_emergency_cases_v" USING btree ("version__status");
  CREATE INDEX "_emergency_cases_v_created_at_idx" ON "_emergency_cases_v" USING btree ("created_at");
  CREATE INDEX "_emergency_cases_v_updated_at_idx" ON "_emergency_cases_v" USING btree ("updated_at");
  CREATE INDEX "_emergency_cases_v_snapshot_idx" ON "_emergency_cases_v" USING btree ("snapshot");
  CREATE INDEX "_emergency_cases_v_published_locale_idx" ON "_emergency_cases_v" USING btree ("published_locale");
  CREATE INDEX "_emergency_cases_v_latest_idx" ON "_emergency_cases_v" USING btree ("latest");
  CREATE INDEX "_emergency_cases_v_autosave_idx" ON "_emergency_cases_v" USING btree ("autosave");
  CREATE INDEX "_emergency_cases_v_version_meta_version_meta_image_idx" ON "_emergency_cases_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_emergency_cases_v_locales_locale_parent_id_unique" ON "_emergency_cases_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_emergency_cases_v_rels_order_idx" ON "_emergency_cases_v_rels" USING btree ("order");
  CREATE INDEX "_emergency_cases_v_rels_parent_idx" ON "_emergency_cases_v_rels" USING btree ("parent_id");
  CREATE INDEX "_emergency_cases_v_rels_path_idx" ON "_emergency_cases_v_rels" USING btree ("path");
  CREATE INDEX "_emergency_cases_v_rels_media_id_idx" ON "_emergency_cases_v_rels" USING btree ("media_id");
  CREATE INDEX "needs_list_updated_at_idx" ON "needs_list" USING btree ("updated_at");
  CREATE INDEX "needs_list_created_at_idx" ON "needs_list" USING btree ("created_at");
  CREATE UNIQUE INDEX "needs_list_locales_locale_parent_id_unique" ON "needs_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "transparency_reports_expenses_order_idx" ON "transparency_reports_expenses" USING btree ("_order");
  CREATE INDEX "transparency_reports_expenses_parent_id_idx" ON "transparency_reports_expenses" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "transparency_reports_expenses_locales_locale_parent_id_uniqu" ON "transparency_reports_expenses_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "transparency_reports_donor_list_order_idx" ON "transparency_reports_donor_list" USING btree ("_order");
  CREATE INDEX "transparency_reports_donor_list_parent_id_idx" ON "transparency_reports_donor_list" USING btree ("_parent_id");
  CREATE INDEX "transparency_reports_updated_at_idx" ON "transparency_reports" USING btree ("updated_at");
  CREATE INDEX "transparency_reports_created_at_idx" ON "transparency_reports" USING btree ("created_at");
  CREATE UNIQUE INDEX "transparency_reports_locales_locale_parent_id_unique" ON "transparency_reports_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "transparency_reports_rels_order_idx" ON "transparency_reports_rels" USING btree ("order");
  CREATE INDEX "transparency_reports_rels_parent_idx" ON "transparency_reports_rels" USING btree ("parent_id");
  CREATE INDEX "transparency_reports_rels_path_idx" ON "transparency_reports_rels" USING btree ("path");
  CREATE INDEX "transparency_reports_rels_media_id_idx" ON "transparency_reports_rels" USING btree ("media_id");
  CREATE INDEX "supporter_comments_updated_at_idx" ON "supporter_comments" USING btree ("updated_at");
  CREATE INDEX "supporter_comments_created_at_idx" ON "supporter_comments" USING btree ("created_at");
  CREATE UNIQUE INDEX "supporter_comments_locales_locale_parent_id_unique" ON "supporter_comments_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_animals_fk" FOREIGN KEY ("animals_id") REFERENCES "public"."animals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_emergency_cases_fk" FOREIGN KEY ("emergency_cases_id") REFERENCES "public"."emergency_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_animals_fk" FOREIGN KEY ("animals_id") REFERENCES "public"."animals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_animals_fk" FOREIGN KEY ("animals_id") REFERENCES "public"."animals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_emergency_cases_fk" FOREIGN KEY ("emergency_cases_id") REFERENCES "public"."emergency_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_needs_list_fk" FOREIGN KEY ("needs_list_id") REFERENCES "public"."needs_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_transparency_reports_fk" FOREIGN KEY ("transparency_reports_id") REFERENCES "public"."transparency_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_supporter_comments_fk" FOREIGN KEY ("supporter_comments_id") REFERENCES "public"."supporter_comments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "redirects_rels_animals_id_idx" ON "redirects_rels" USING btree ("animals_id");
  CREATE INDEX "redirects_rels_emergency_cases_id_idx" ON "redirects_rels" USING btree ("emergency_cases_id");
  CREATE INDEX "search_rels_animals_id_idx" ON "search_rels" USING btree ("animals_id");
  CREATE INDEX "payload_locked_documents_rels_animals_id_idx" ON "payload_locked_documents_rels" USING btree ("animals_id");
  CREATE INDEX "payload_locked_documents_rels_emergency_cases_id_idx" ON "payload_locked_documents_rels" USING btree ("emergency_cases_id");
  CREATE INDEX "payload_locked_documents_rels_needs_list_id_idx" ON "payload_locked_documents_rels" USING btree ("needs_list_id");
  CREATE INDEX "payload_locked_documents_rels_transparency_reports_id_idx" ON "payload_locked_documents_rels" USING btree ("transparency_reports_id");
  CREATE INDEX "payload_locked_documents_rels_supporter_comments_id_idx" ON "payload_locked_documents_rels" USING btree ("supporter_comments_id");
  INSERT INTO "posts_locales" ("_locale", "_parent_id", "title")
  SELECT 'tr', "id", "title" FROM "posts" WHERE "title" IS NOT NULL
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "title" = EXCLUDED."title";
  INSERT INTO "_posts_v_locales" ("_locale", "_parent_id", "version_title")
  SELECT 'tr', "id", "version_title" FROM "_posts_v" WHERE "version_title" IS NOT NULL
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "version_title" = EXCLUDED."version_title";
  ALTER TABLE "posts" DROP COLUMN "title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_title";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "animals" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "animals_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "animals_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_animals_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_animals_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_animals_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "emergency_cases_updates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "emergency_cases_updates_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "emergency_cases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "emergency_cases_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "emergency_cases_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_emergency_cases_v_version_updates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_emergency_cases_v_version_updates_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_emergency_cases_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_emergency_cases_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_emergency_cases_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "needs_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "needs_list_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "transparency_reports_expenses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "transparency_reports_expenses_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "transparency_reports_donor_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "transparency_reports" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "transparency_reports_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "transparency_reports_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "supporter_comments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "supporter_comments_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "redirects_rels" DROP CONSTRAINT IF EXISTS "redirects_rels_animals_fk";
  ALTER TABLE "redirects_rels" DROP CONSTRAINT IF EXISTS "redirects_rels_emergency_cases_fk";
  ALTER TABLE "search_rels" DROP CONSTRAINT IF EXISTS "search_rels_animals_fk";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_animals_fk";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_emergency_cases_fk";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_needs_list_fk";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_transparency_reports_fk";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_supporter_comments_fk";
  DROP TABLE "posts_tags" CASCADE;
  DROP TABLE "_posts_v_version_tags" CASCADE;
  DROP TABLE "animals" CASCADE;
  DROP TABLE "animals_locales" CASCADE;
  DROP TABLE "animals_rels" CASCADE;
  DROP TABLE "_animals_v" CASCADE;
  DROP TABLE "_animals_v_locales" CASCADE;
  DROP TABLE "_animals_v_rels" CASCADE;
  DROP TABLE "emergency_cases_updates" CASCADE;
  DROP TABLE "emergency_cases_updates_locales" CASCADE;
  DROP TABLE "emergency_cases" CASCADE;
  DROP TABLE "emergency_cases_locales" CASCADE;
  DROP TABLE "emergency_cases_rels" CASCADE;
  DROP TABLE "_emergency_cases_v_version_updates" CASCADE;
  DROP TABLE "_emergency_cases_v_version_updates_locales" CASCADE;
  DROP TABLE "_emergency_cases_v" CASCADE;
  DROP TABLE "_emergency_cases_v_locales" CASCADE;
  DROP TABLE "_emergency_cases_v_rels" CASCADE;
  DROP TABLE "needs_list" CASCADE;
  DROP TABLE "needs_list_locales" CASCADE;
  DROP TABLE "transparency_reports_expenses" CASCADE;
  DROP TABLE "transparency_reports_expenses_locales" CASCADE;
  DROP TABLE "transparency_reports_donor_list" CASCADE;
  DROP TABLE "transparency_reports" CASCADE;
  DROP TABLE "transparency_reports_locales" CASCADE;
  DROP TABLE "transparency_reports_rels" CASCADE;
  DROP TABLE "supporter_comments" CASCADE;
  DROP TABLE "supporter_comments_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  
  DROP INDEX "redirects_rels_animals_id_idx";
  DROP INDEX "redirects_rels_emergency_cases_id_idx";
  DROP INDEX "search_rels_animals_id_idx";
  DROP INDEX "payload_locked_documents_rels_animals_id_idx";
  DROP INDEX "payload_locked_documents_rels_emergency_cases_id_idx";
  DROP INDEX "payload_locked_documents_rels_needs_list_id_idx";
  DROP INDEX "payload_locked_documents_rels_transparency_reports_id_idx";
  DROP INDEX "payload_locked_documents_rels_supporter_comments_id_idx";
  ALTER TABLE "posts" ADD COLUMN "title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "posts" DROP COLUMN "post_category";
  ALTER TABLE "posts_locales" DROP COLUMN "title";
  ALTER TABLE "posts_locales" DROP COLUMN "excerpt";
  ALTER TABLE "_posts_v" DROP COLUMN "version_post_category";
  ALTER TABLE "_posts_v_locales" DROP COLUMN "version_title";
  ALTER TABLE "_posts_v_locales" DROP COLUMN "version_excerpt";
  ALTER TABLE "redirects_rels" DROP COLUMN "animals_id";
  ALTER TABLE "redirects_rels" DROP COLUMN "emergency_cases_id";
  ALTER TABLE "search_rels" DROP COLUMN "animals_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "animals_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "emergency_cases_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "needs_list_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "transparency_reports_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "supporter_comments_id";
  DROP TYPE "public"."enum_posts_post_category";
  DROP TYPE "public"."enum__posts_v_version_post_category";
  DROP TYPE "public"."enum_animals_type";
  DROP TYPE "public"."enum_animals_gender";
  DROP TYPE "public"."enum_animals_status";
  DROP TYPE "public"."enum__animals_v_version_type";
  DROP TYPE "public"."enum__animals_v_version_gender";
  DROP TYPE "public"."enum__animals_v_version_status";
  DROP TYPE "public"."enum__animals_v_published_locale";
  DROP TYPE "public"."enum_emergency_cases_case_status";
  DROP TYPE "public"."enum_emergency_cases_status";
  DROP TYPE "public"."enum__emergency_cases_v_version_case_status";
  DROP TYPE "public"."enum__emergency_cases_v_version_status";
  DROP TYPE "public"."enum__emergency_cases_v_published_locale";
  DROP TYPE "public"."enum_needs_list_urgency";`)
}
