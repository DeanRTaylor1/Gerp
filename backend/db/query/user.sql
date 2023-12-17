-- name: CreateUser :one
INSERT INTO users (
  username,
  first_name,
  last_name,
  email,
  password,
  status,
  role
) VALUES (
  $1, $2, $3, $4, $5, $6, $7
) RETURNING *;

-- name: GetUser :one
SELECT * FROM users 
WHERE id = $1 LIMIT 1;

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
  status = $7,
  role = $8,
  updated_at = NOW()
WHERE id = $1;



-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;