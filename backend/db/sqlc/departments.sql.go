// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.24.0
// source: departments.sql

package db

import (
	"context"
)

const createDepartment = `-- name: CreateDepartment :one
INSERT INTO departments (department_name) 
VALUES ($1) 
RETURNING id, department_name
`

func (q *Queries) CreateDepartment(ctx context.Context, departmentName string) (Department, error) {
	row := q.db.QueryRow(ctx, createDepartment, departmentName)
	var i Department
	err := row.Scan(&i.ID, &i.DepartmentName)
	return i, err
}

const deleteDepartment = `-- name: DeleteDepartment :exec
DELETE FROM departments
WHERE id = $1
`

func (q *Queries) DeleteDepartment(ctx context.Context, id int32) error {
	_, err := q.db.Exec(ctx, deleteDepartment, id)
	return err
}

const getAllDepartments = `-- name: GetAllDepartments :many
SELECT id, department_name FROM departments
ORDER BY id
LIMIT $1 OFFSET $2
`

type GetAllDepartmentsParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

func (q *Queries) GetAllDepartments(ctx context.Context, arg GetAllDepartmentsParams) ([]Department, error) {
	rows, err := q.db.Query(ctx, getAllDepartments, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Department{}
	for rows.Next() {
		var i Department
		if err := rows.Scan(&i.ID, &i.DepartmentName); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getDepartment = `-- name: GetDepartment :one
SELECT id, department_name FROM departments 
WHERE id = $1
`

func (q *Queries) GetDepartment(ctx context.Context, id int32) (Department, error) {
	row := q.db.QueryRow(ctx, getDepartment, id)
	var i Department
	err := row.Scan(&i.ID, &i.DepartmentName)
	return i, err
}

const getDepartmentForUpdate = `-- name: GetDepartmentForUpdate :one
SELECT id, department_name FROM departments
WHERE id = $1
FOR UPDATE
`

func (q *Queries) GetDepartmentForUpdate(ctx context.Context, id int32) (Department, error) {
	row := q.db.QueryRow(ctx, getDepartmentForUpdate, id)
	var i Department
	err := row.Scan(&i.ID, &i.DepartmentName)
	return i, err
}

const updateDepartment = `-- name: UpdateDepartment :exec
UPDATE departments
SET
  department_name = COALESCE($2, department_name)
WHERE id = $1
`

type UpdateDepartmentParams struct {
	ID             int32  `json:"id"`
	DepartmentName string `json:"department_name"`
}

func (q *Queries) UpdateDepartment(ctx context.Context, arg UpdateDepartmentParams) error {
	_, err := q.db.Exec(ctx, updateDepartment, arg.ID, arg.DepartmentName)
	return err
}
