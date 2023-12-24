-- name: CreateGender :one
INSERT INTO genders (
  gender_name
) VALUES (
  $1
) RETURNING *;

-- name: GetGender :one
SELECT * FROM genders 
WHERE id = $1 LIMIT 1;

-- name: GetGenders :many
SELECT * FROM genders
LIMIT $2
OFFSET $1;

-- name: GetGenderForUpdate :one
SELECT * FROM genders
WHERE id = $1 LIMIT 1
FOR NO KEY UPDATE;

-- name: GetGenderByName :one
SELECT id, gender_name FROM genders
WHERE gender_name = $1 LIMIT 1;

-- name: UpdateGender :exec
UPDATE genders
SET
  gender_name = $2,
  updated_at = NOW()
WHERE id = $1;


-- name: DeleteGender :exec
DELETE FROM genders
WHERE id = $1;