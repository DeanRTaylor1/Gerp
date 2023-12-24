-- name: CreateMaritalStatus :one
INSERT INTO marital_statuses (
  status_name
) VALUES (
  $1
) RETURNING *;

-- name: GetMaritalStatus :one
SELECT * FROM marital_statuses 
WHERE id = $1 LIMIT 1;

-- name: GetMaritalStatuses :many
SELECT * FROM marital_statuses
LIMIT $2
OFFSET $1;

-- name: GetMaritalStatusForUpdate :one
SELECT * FROM marital_statuses
WHERE id = $1 LIMIT 1
FOR NO KEY UPDATE;

-- name: GetMaritalStatusByName :one
SELECT id, status_name FROM marital_statuses
WHERE status_name = $1 LIMIT 1;

-- name: UpdateMaritalStatus :exec
UPDATE marital_statuses
SET
  status_name = $2,
  updated_at = NOW()
WHERE id = $1;


-- name: DeleteMaritalStatus :exec
DELETE FROM marital_statuses
WHERE id = $1;