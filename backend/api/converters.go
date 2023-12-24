package api

import (
	"time"

	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/jackc/pgx/v5/pgtype"
)

func (u *UserRequest) ToCreateUserParams(hashedPassword string) db.CreateUserParams {
	var avatar pgtype.Text
	if u.Avatar != nil {
		avatar = pgtype.Text{String: *u.Avatar, Valid: true}
	}

	return db.CreateUserParams{
		Email:        string(u.Email),
		Username:     u.Username,
		FirstName:    *u.FirstName,
		LastName:     *u.LastName,
		Password:     hashedPassword,
		Avatar:       avatar,
		RoleID:       1,
		UserStatusID: 1,
		LastLogin:    pgtype.Timestamp{Time: time.Now(), Valid: true},
	}
}
