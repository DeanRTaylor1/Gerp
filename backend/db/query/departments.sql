-- name: CreateDepartment :one
INSERT INTO departments (department_name) 
VALUES ($1) 
RETURNING *;

-- name: GetDepartment :one
SELECT * FROM departments 
WHERE id = $1;

-- name: GetAllDepartments :many
SELECT * FROM departments
ORDER BY id
LIMIT $1 OFFSET $2;

-- name: GetDepartmentForUpdate :one
SELECT * FROM departments
WHERE id = $1
FOR UPDATE;

-- name: UpdateDepartment :exec
UPDATE departments
SET
  department_name = COALESCE($2, department_name)
WHERE id = $1;

-- name: DeleteDepartment :exec
DELETE FROM departments
WHERE id = $1;
