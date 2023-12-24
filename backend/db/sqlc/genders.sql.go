// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.24.0
// source: genders.sql

package db

import (
	"context"
)

const createGender = `-- name: CreateGender :one
INSERT INTO genders (
  gender_name
) VALUES (
  $1
) RETURNING id, gender_name, created_at, updated_at
`

func (q *Queries) CreateGender(ctx context.Context, genderName string) (Gender, error) {
	row := q.db.QueryRow(ctx, createGender, genderName)
	var i Gender
	err := row.Scan(
		&i.ID,
		&i.GenderName,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteGender = `-- name: DeleteGender :exec
DELETE FROM genders
WHERE id = $1
`

func (q *Queries) DeleteGender(ctx context.Context, id int32) error {
	_, err := q.db.Exec(ctx, deleteGender, id)
	return err
}

const getGender = `-- name: GetGender :one
SELECT id, gender_name, created_at, updated_at FROM genders 
WHERE id = $1 LIMIT 1
`

func (q *Queries) GetGender(ctx context.Context, id int32) (Gender, error) {
	row := q.db.QueryRow(ctx, getGender, id)
	var i Gender
	err := row.Scan(
		&i.ID,
		&i.GenderName,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getGenderByName = `-- name: GetGenderByName :one
SELECT id, gender_name FROM genders
WHERE gender_name = $1 LIMIT 1
`

type GetGenderByNameRow struct {
	ID         int32  `json:"id"`
	GenderName string `json:"gender_name"`
}

func (q *Queries) GetGenderByName(ctx context.Context, genderName string) (GetGenderByNameRow, error) {
	row := q.db.QueryRow(ctx, getGenderByName, genderName)
	var i GetGenderByNameRow
	err := row.Scan(&i.ID, &i.GenderName)
	return i, err
}

const getGenderForUpdate = `-- name: GetGenderForUpdate :one
SELECT id, gender_name, created_at, updated_at FROM genders
WHERE id = $1 LIMIT 1
FOR NO KEY UPDATE
`

func (q *Queries) GetGenderForUpdate(ctx context.Context, id int32) (Gender, error) {
	row := q.db.QueryRow(ctx, getGenderForUpdate, id)
	var i Gender
	err := row.Scan(
		&i.ID,
		&i.GenderName,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getGenders = `-- name: GetGenders :many
SELECT id, gender_name, created_at, updated_at FROM genders
LIMIT $2
OFFSET $1
`

type GetGendersParams struct {
	Offset int32 `json:"offset"`
	Limit  int32 `json:"limit"`
}

func (q *Queries) GetGenders(ctx context.Context, arg GetGendersParams) ([]Gender, error) {
	rows, err := q.db.Query(ctx, getGenders, arg.Offset, arg.Limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Gender{}
	for rows.Next() {
		var i Gender
		if err := rows.Scan(
			&i.ID,
			&i.GenderName,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateGender = `-- name: UpdateGender :exec
UPDATE genders
SET
  gender_name = $2,
  updated_at = NOW()
WHERE id = $1
`

type UpdateGenderParams struct {
	ID         int32  `json:"id"`
	GenderName string `json:"gender_name"`
}

func (q *Queries) UpdateGender(ctx context.Context, arg UpdateGenderParams) error {
	_, err := q.db.Exec(ctx, updateGender, arg.ID, arg.GenderName)
	return err
}
