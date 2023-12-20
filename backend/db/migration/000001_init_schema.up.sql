CREATE TYPE user_status AS ENUM ('active', 'inactive');

CREATE TYPE user_role AS ENUM('admin', 'user', 'manager');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status user_status NOT NULL DEFAULT 'active',
    role user_role NOT NULL DEFAULT 'users', 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_id ON users (id);
