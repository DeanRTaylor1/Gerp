CREATE TYPE "user_status" AS ENUM ('active', 'inactive');

CREATE TYPE "user_role" AS ENUM ('admin', 'user', 'manager');

CREATE TYPE "gender" AS ENUM ('male', 'female', 'non-binary');

CREATE TYPE "marital_status" AS ENUM ('single', 'married');

CREATE TABLE
    "users" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR(255) NOT NULL,
        "first_name" VARCHAR(255) NOT NULL,
        "last_name" VARCHAR(255) NOT NULL,
        "email" VARCHAR(255) NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "avatar" VARCHAR(255),
        "last_login" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
        "status" user_status NOT NULL DEFAULT 'active',
        "role" user_role NOT NULL DEFAULT 'user',
        "created_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            "updated_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    "pay_scales" (
        "id" SERIAL PRIMARY KEY,
        "scale_start" VARCHAR(255) NOT NULL,
        "scale_end" VARCHAR(255) NOT NULL,
        "holiday_allocation" INT NOT NULL,
        "created_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            "updated_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    "contracts" (
        "id" SERIAL PRIMARY KEY,
        "pay_scale_id" INT,
        "profile_id" INT,
        "contract_start" TIMESTAMP NOT NULL,
        "contract_end" TIMESTAMP,
        "created_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            "updated_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    "profiles" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INT,
        "latest_contract_id" INT,
        "gender" gender,
        "date_of_birth" TIMESTAMP NOT NULL,
        "nationality" VARCHAR(255) NOT NULL,
        "marital_status" marital_status NOT NULL,
        "dependents" INT DEFAULT 0,
        "emergency_contact_id" INT,
        "created_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            "updated_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    "emergency_contacts" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "contact_number" VARCHAR(255) NOT NULL,
        "contact_address" VARCHAR(255),
        "created_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            "updated_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    "addresses" (
        "id" SERIAL PRIMARY KEY,
        "profile_id" INT,
        "address_line1" VARCHAR(255) NOT NULL,
        "address_line2" VARCHAR(255),
        "city" VARCHAR(255) NOT NULL,
        "state" VARCHAR(255),
        "postal_code" VARCHAR(255),
        "country" VARCHAR(255) NOT NULL,
        "address_type" VARCHAR(255) DEFAULT 'residential',
        "created_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            "updated_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    "tax_rates" (
        "id" SERIAL PRIMARY KEY,
        "pay_scale_id" INT,
        "rate" NUMERIC(5, 2) NOT NULL,
        "description" VARCHAR(255),
        "effective_from" TIMESTAMP,
        "effective_to" TIMESTAMP,
        "created_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            "updated_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    "leave_types" (
        "id" SERIAL PRIMARY KEY,
        "type_name" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "created_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            "updated_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    "leave_requests" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INT,
        "leave_type_id" INT,
        "start_date" TIMESTAMP NOT NULL,
        "end_date" TIMESTAMP NOT NULL,
        "status" VARCHAR(255) DEFAULT 'pending',
        "reason" TEXT,
        "created_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            "updated_at" TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE INDEX "idx_users_id" ON "users" ("id");

CREATE INDEX "idx_pay_scales_id" ON "pay_scales" ("id");

CREATE INDEX "idx_contracts_id" ON "contracts" ("id");

CREATE INDEX "idx_profiles_id" ON "profiles" ("id");

CREATE INDEX "idx_emergency_contacts_id" ON "emergency_contacts" ("id");

CREATE INDEX "idx_adresses_id" ON "addresses" ("id");

CREATE INDEX "idx_tax_rates_id" ON "tax_rates" ("id");

CREATE INDEX "idx_leave_types_id" ON "leave_types" ("id");

CREATE INDEX "idx_leave_requests_id" ON "leave_requests" ("id");

ALTER TABLE "contracts" ADD FOREIGN KEY ("pay_scale_id") REFERENCES "pay_scales" ("id");

ALTER TABLE "contracts" ADD FOREIGN KEY ("profile_id") REFERENCES "profiles" ("id");

ALTER TABLE "profiles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "profiles" ADD FOREIGN KEY ("latest_contract_id") REFERENCES "contracts" ("id");

ALTER TABLE "profiles" ADD FOREIGN KEY ("emergency_contact_id") REFERENCES "emergency_contacts" ("id");

ALTER TABLE "addresses" ADD FOREIGN KEY ("profile_id") REFERENCES "profiles" ("id");

ALTER TABLE "tax_rates" ADD FOREIGN KEY ("pay_scale_id") REFERENCES "pay_scales" ("id");

ALTER TABLE "leave_requests" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "leave_requests" ADD FOREIGN KEY ("leave_type_id") REFERENCES "leave_types" ("id");