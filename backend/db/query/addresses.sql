-- name: CreateAddress :one
INSERT INTO addresses (
  profile_id, address_line1, address_line2, city, state, postal_code, 
  country, address_type
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8
) RETURNING *;

-- name: GetAddress :one
SELECT * FROM addresses 
WHERE id = $1;

-- name: GetAddressesByProfileId :many
SELECT * FROM addresses
WHERE profile_id = $1
ORDER BY id;

-- name: GetAllAddresses :many
SELECT * FROM addresses
ORDER BY id
LIMIT $1 OFFSET $2;

-- name: GetAddressForUpdate :one
SELECT * FROM addresses
WHERE id = $1
FOR UPDATE;

-- name: UpdateAddress :exec
UPDATE addresses
SET
  address_line1 = COALESCE($2, address_line1),
  address_line2 = COALESCE($3, address_line2),
  city = COALESCE($4, city),
  state = COALESCE($5, state),
  postal_code = COALESCE($6, postal_code),
  country = COALESCE($7, country),
  address_type = COALESCE($8, address_type),
  updated_at = NOW()
WHERE profile_id = $1;

-- name: DeleteAddress :exec
DELETE FROM addresses
WHERE id = $1;
