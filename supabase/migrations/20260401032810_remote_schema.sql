


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."affiliations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "updated_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."affiliations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."bounties" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "amount" bigint,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "character_id" "uuid",
    "is_active" boolean DEFAULT true NOT NULL
);


ALTER TABLE "public"."bounties" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."characters" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "jsonb",
    "age" integer
);


ALTER TABLE "public"."characters" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."devil_fruits" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."devil_fruits" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."islands" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."islands" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ships" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."ships" OWNER TO "postgres";


ALTER TABLE ONLY "public"."affiliations"
    ADD CONSTRAINT "affiliations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."bounties"
    ADD CONSTRAINT "bounties_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."characters"
    ADD CONSTRAINT "characters_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."devil_fruits"
    ADD CONSTRAINT "devil_fruits_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."islands"
    ADD CONSTRAINT "islands_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ships"
    ADD CONSTRAINT "ships_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."bounties"
    ADD CONSTRAINT "bounties_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id");



ALTER TABLE "public"."affiliations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."bounties" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."characters" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."devil_fruits" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."islands" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."ships" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";








































































































































































GRANT ALL ON TABLE "public"."affiliations" TO "anon";
GRANT ALL ON TABLE "public"."affiliations" TO "authenticated";
GRANT ALL ON TABLE "public"."affiliations" TO "service_role";



GRANT ALL ON TABLE "public"."bounties" TO "anon";
GRANT ALL ON TABLE "public"."bounties" TO "authenticated";
GRANT ALL ON TABLE "public"."bounties" TO "service_role";



GRANT ALL ON TABLE "public"."characters" TO "anon";
GRANT ALL ON TABLE "public"."characters" TO "authenticated";
GRANT ALL ON TABLE "public"."characters" TO "service_role";



GRANT ALL ON TABLE "public"."devil_fruits" TO "anon";
GRANT ALL ON TABLE "public"."devil_fruits" TO "authenticated";
GRANT ALL ON TABLE "public"."devil_fruits" TO "service_role";



GRANT ALL ON TABLE "public"."islands" TO "anon";
GRANT ALL ON TABLE "public"."islands" TO "authenticated";
GRANT ALL ON TABLE "public"."islands" TO "service_role";



GRANT ALL ON TABLE "public"."ships" TO "anon";
GRANT ALL ON TABLE "public"."ships" TO "authenticated";
GRANT ALL ON TABLE "public"."ships" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































