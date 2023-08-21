CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(14) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
