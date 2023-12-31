-- name: CreateUser :one
INSERT INTO users (
  username,
  first_name,
  last_name,
  email,
  password,
  avatar,
  last_login,
  user_status_id,
  role_id
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, $9
) RETURNING *;

-- name: GetUser :one
SELECT 
    users.id,
    users.username,
    users.first_name,
    users.last_name,
    users.email,
    users.password,
    users.avatar,
    users.last_login,
    users.user_status_id,
    users.role_id,
    users.created_at,
    users.updated_at,
    user_roles.role_name AS role_name,
    user_statuses.status_name AS status_name,
    profiles.date_of_birth AS date_of_birth,
    profiles.nationality AS nationality,
    profiles.dependents AS dependents,
    profiles.id AS profile_id,
    emergency_contacts.name AS emergency_contact_name,
    emergency_contacts.contact_number AS emergency_contact_number,
    emergency_contacts.contact_address AS emergency_contact_address,
    departments.department_name AS department_name,
    genders.gender_name AS gender,
    marital_statuses.status_name AS marital_status,
    addresses.address_line1 AS address_line_1,
    addresses.address_line2 AS address_line_2,
    addresses.city AS city,
    addresses.state AS residence_state,
    addresses.country AS country,
    addresses.postal_code as postal_code,
    addresses.country as country
FROM users 
JOIN user_roles ON users.role_id = user_roles.id
JOIN user_statuses ON users.user_status_id = user_statuses.id
LEFT JOIN profiles ON users.id = profiles.user_id
LEFT JOIN emergency_contacts ON profiles.emergency_contact_id = emergency_contacts.id
LEFT JOIN departments ON profiles.department_id = departments.id
LEFT JOIN genders ON profiles.gender_id = genders.id
LEFT JOIN marital_statuses ON profiles.marital_status_id = marital_statuses.id
LEFT JOIN addresses ON profiles.id = addresses.profile_id
WHERE users.id = $1 
LIMIT 1;

-- name: GetUserByEmail :one
SELECT 
    users.id,
    users.username,
    users.first_name,
    users.last_name,
    users.email,
    users.password,
    users.avatar,
    users.last_login,
    users.user_status_id,
    users.role_id,
    users.created_at,
    users.updated_at,
    user_roles.role_name AS role_name,
    user_statuses.status_name AS status_name,
    profiles.date_of_birth AS date_of_birth,
    profiles.nationality AS nationality,
    profiles.dependents AS dependents,
    emergency_contacts.name AS emergency_contact_name,
    emergency_contacts.contact_number AS emergency_contact_number,
    emergency_contacts.contact_address AS emergency_contact_address,
    departments.department_name AS department_name,
    genders.gender_name AS gender,
    marital_statuses.status_name AS marital_status
FROM users 
JOIN user_roles ON users.role_id = user_roles.id
JOIN user_statuses ON users.user_status_id = user_statuses.id
LEFT JOIN profiles ON users.id = profiles.user_id
LEFT JOIN emergency_contacts ON profiles.emergency_contact_id = emergency_contacts.id
LEFT JOIN departments ON profiles.department_id = departments.id
LEFT JOIN genders ON profiles.gender_id = genders.id
LEFT JOIN marital_statuses ON profiles.marital_status_id = marital_status_id
WHERE users.email = $1 
LIMIT 1;



-- name: GetUsers :many
SELECT 
    users.id,
    users.username,
    users.first_name,
    users.last_name,
    users.email,
    users.password,
    users.avatar,
    users.last_login,
    users.user_status_id,
    users.role_id,
    users.created_at,
    users.updated_at,
    user_roles.role_name AS role_name,
    user_statuses.status_name AS status_name,
    profiles.date_of_birth AS date_of_birth,
    profiles.nationality AS nationality,
    profiles.dependents AS dependents,
    emergency_contacts.name AS emergency_contact_name,
    emergency_contacts.contact_number AS emergency_contact_number,
    emergency_contacts.contact_address AS emergency_contact_address,
    departments.department_name AS department_name,
    genders.gender_name AS gender,
    marital_statuses.status_name AS marital_status
FROM users 
JOIN user_roles ON users.role_id = user_roles.id
JOIN user_statuses ON users.user_status_id = user_statuses.id
LEFT JOIN profiles ON users.id = profiles.user_id
LEFT JOIN emergency_contacts ON profiles.emergency_contact_id = emergency_contacts.id
LEFT JOIN departments ON profiles.department_id = departments.id
LEFT JOIN genders ON profiles.gender_id = genders.id
LEFT JOIN marital_statuses ON profiles.marital_status_id = marital_statuses.id
LIMIT $2
OFFSET $1;


-- name: GetUserForUpdate :one
SELECT * FROM users
WHERE id = $1 LIMIT 1
FOR NO KEY UPDATE;

-- name: UpdateUser :exec
UPDATE users
SET
  username = $2,
  first_name = $3,
  last_name = $4,
  email = $5,
  password = $6,
  user_status_id = $7,
  role_id = $8,
  avatar = $9,
  updated_at = NOW()
WHERE id = $1;

-- name: UpdateLastLogin :exec
UPDATE users
SET
  last_login = NOW()
WHERE id = $1;


-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;