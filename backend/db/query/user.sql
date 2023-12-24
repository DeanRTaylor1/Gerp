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
SELECT * FROM users 
WHERE id = $1 LIMIT 1;

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
    user_statuses.status_name AS status_name
FROM users 
JOIN user_roles ON users.role_id = user_roles.id
JOIN user_statuses ON users.user_status_id = user_statuses.id
WHERE users.email = $1 
LIMIT 1;



-- name: GetUsers :many
SELECT * FROM users
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