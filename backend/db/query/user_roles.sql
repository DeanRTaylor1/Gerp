-- name: CreateUserRole :one
INSERT INTO user_roles (
  role_name
) VALUES (
  $1
) RETURNING *;

-- name: GetUserRole :one
SELECT * FROM user_roles 
WHERE id = $1 LIMIT 1;

-- name: GetUserRoles :many
SELECT * FROM user_roles
LIMIT $2
OFFSET $1;

-- name: GetUserRoleForUpdate :one
SELECT * FROM user_roles
WHERE id = $1 LIMIT 1
FOR NO KEY UPDATE;

-- name: GetUserRoleByName :one
SELECT id, role_name FROM user_roles
WHERE role_name = $1 LIMIT 1;

-- name: UpdateUserRole :exec
UPDATE user_roles
SET
  role_name = $2,
  updated_at = NOW()
WHERE id = $1;


-- name: DeleteUserRole :exec
DELETE FROM user_roles
WHERE id = $1;