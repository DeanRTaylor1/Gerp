CREATE TABLE
    "user_statuses" (
        "id" SERIAL PRIMARY KEY,
        "status_name" VARCHAR(255) UNIQUE NOT NULL,
        "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
        "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
    );

CREATE TABLE
    "user_roles" (
        "id" SERIAL PRIMARY KEY,
        "role_name" VARCHAR(255) UNIQUE NOT NULL,
        "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
        "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
    );

CREATE TABLE
    "genders" (
        "id" SERIAL PRIMARY KEY,
        "gender_name" VARCHAR(255) UNIQUE NOT NULL,
        "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
        "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
    );

CREATE TABLE
    "marital_statuses" (
        "id" SERIAL PRIMARY KEY,
        "status_name" VARCHAR(255) UNIQUE NOT NULL,
        "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
        "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
    );

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
        "user_status_id" INT NOT NULL,
        "role_id" INT NOT NULL,
        "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
        "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
    );

CREATE TABLE
    "pay_scales" (
        "id" SERIAL PRIMARY KEY,
        "scale_name" VARCHAR(255) NOT NULL,
        "scale_start" INT NOT NULL,
        "scale_end" INT NOT NULL,
        "holiday_allocation" INT NOT NULL,
        "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
        "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
    );

CREATE TABLE
    "contracts" (
        "id" SERIAL PRIMARY KEY,
        "pay_scale_id" INT,
        "profile_id" INT,
        "contract_start" TIMESTAMP NOT NULL,
        "contract_end" TIMESTAMP,
        "Actual Salary" INT NOT NULL,
        "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
        "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
    );

CREATE TABLE
    "departments" (
        "id" SERIAL PRIMARY KEY,
        "department_name" VARCHAR(255) NOT NULL
    );

CREATE TABLE
    "profiles" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INT,
        "latest_contract_id" INT,
        "gender_id" INT,
        "date_of_birth" TIMESTAMP NOT NULL,
        "nationality" VARCHAR(255) NOT NULL,
        "marital_status_id" INT NOT NULL,
        "dependents" INT DEFAULT 0,
        "emergency_contact_id" INT,
        "department_id" INT,
        "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
        "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
    );

CREATE TABLE
    "emergency_contacts" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "contact_number" VARCHAR(255) NOT NULL,
        "contact_address" VARCHAR(255),
        "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
        "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
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
        "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
        "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
    );

CREATE TABLE
    "leave_types" (
        "id" SERIAL PRIMARY KEY,
        "type_name" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
        "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
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
        "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
        "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
    );

CREATE INDEX "idx_user_statuses_id" ON "user_statuses" ("id");

CREATE INDEX "idx_user_roles_id" ON "user_roles" ("id");

CREATE INDEX "idx_genders_id" ON "genders" ("id");

CREATE INDEX "idx_marital_statuses_id" ON "marital_statuses" ("id");

CREATE INDEX "idx_users_id" ON "users" ("id");

CREATE INDEX "idx_pay_scales_id" ON "pay_scales" ("id");

CREATE INDEX "idx_contracts_id" ON "contracts" ("id");

CREATE INDEX "idx_department_id" ON "departments" ("id");

CREATE INDEX "idx_profiles_id" ON "profiles" ("id");

CREATE INDEX "idx_emergency_contacts_id" ON "emergency_contacts" ("id");

CREATE INDEX "idx_adresses_id" ON "addresses" ("id");

CREATE INDEX "idx_leave_types_id" ON "leave_types" ("id");

CREATE INDEX "idx_leave_requests_id" ON "leave_requests" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("user_status_id") REFERENCES "user_statuses" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "user_roles" ("id");

ALTER TABLE "contracts" ADD FOREIGN KEY ("pay_scale_id") REFERENCES "pay_scales" ("id");

ALTER TABLE "contracts" ADD FOREIGN KEY ("profile_id") REFERENCES "profiles" ("id");

ALTER TABLE "profiles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "profiles" ADD FOREIGN KEY ("latest_contract_id") REFERENCES "contracts" ("id");

ALTER TABLE "profiles" ADD FOREIGN KEY ("gender_id") REFERENCES "genders" ("id");

ALTER TABLE "profiles" ADD FOREIGN KEY ("marital_status_id") REFERENCES "marital_statuses" ("id");

ALTER TABLE "profiles" ADD FOREIGN KEY ("emergency_contact_id") REFERENCES "emergency_contacts" ("id");

ALTER TABLE "profiles" ADD FOREIGN KEY ("department_id") REFERENCES "departments" ("id");

ALTER TABLE "addresses" ADD FOREIGN KEY ("profile_id") REFERENCES "profiles" ("id");

ALTER TABLE "leave_requests" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "leave_requests" ADD FOREIGN KEY ("leave_type_id") REFERENCES "leave_types" ("id");