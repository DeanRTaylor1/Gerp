-- name: CreateProfile :one
INSERT INTO profiles (
  user_id, latest_contract_id, gender_id, date_of_birth, nationality, 
  marital_status_id, dependents, emergency_contact_id, department_id
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, $9
) RETURNING *;


-- name: GetProfile :one
SELECT * FROM profiles 
WHERE id = $1;

-- name: GetProfiles :many
SELECT * FROM profiles
ORDER BY id
LIMIT $1 OFFSET $2;

-- name: GetProfileForUpdate :one
SELECT * FROM profiles
WHERE id = $1
FOR UPDATE;

-- name: UpdateProfile :exec
UPDATE profiles
SET
  user_id = COALESCE($2, user_id),
  latest_contract_id = COALESCE($3, latest_contract_id),
  gender_id = COALESCE($4, gender_id),
  date_of_birth = COALESCE($5, date_of_birth),
  nationality = COALESCE($6, nationality),
  marital_status_id = COALESCE($7, marital_status_id),
  dependents = COALESCE($8, dependents),
  emergency_contact_id = COALESCE($9, emergency_contact_id),
  department_id = COALESCE($10, department_id),
  updated_at = NOW()
WHERE id = $1;

-- name: DeleteProfile :exec
DELETE FROM profiles
WHERE id = $1;
