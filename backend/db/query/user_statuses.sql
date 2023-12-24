-- name: CreateUserStatus :one
INSERT INTO user_statuses (
  status_name
) VALUES (
  $1
) RETURNING *;

-- name: GetUserStatus :one
SELECT * FROM user_statuses 
WHERE id = $1 LIMIT 1;

-- name: GetUserStatuses :many
SELECT * FROM user_statuses
LIMIT $2
OFFSET $1;

-- name: GetUserStatusForUpdate :one
SELECT * FROM user_statuses
WHERE id = $1 LIMIT 1
FOR NO KEY UPDATE;

-- name: GetUserUserStatusByName :one
SELECT id, status_name FROM user_statuses
WHERE status_name = $1 LIMIT 1;

-- name: UpdateUserStatus :exec
UPDATE user_statuses
SET
  status_name = $2,
  updated_at = NOW()
WHERE id = $1;


-- name: DeleteUserStatus :exec
DELETE FROM user_statuses
WHERE id = $1;