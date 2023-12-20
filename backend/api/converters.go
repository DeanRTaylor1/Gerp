package api

import (
	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/jackc/pgx/v5/pgtype"
)

func (u *User) ToCreateUserParams() db.CreateUserParams {
	return db.CreateUserParams{
		Email:     string(u.Email),
		Username:  u.Username,
		FirstName: pgtype.Text{String: *u.FirstName},
		LastName:  pgtype.Text{String: *u.LastName},
		Password:  u.Password,
		Role:      db.UserRoleUser,
		Status:    db.UserStatusActive,
	}
}
