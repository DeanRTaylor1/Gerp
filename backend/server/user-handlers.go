package server

import (
	"fmt"
	"net/http"

	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
)

func (s *Server) GetUsers(c *gin.Context, params GetUsersParams) {
	fmt.Printf("%d %d", *params.Limit, *params.Offset)

	users, err := s.DB.GetUsers(c, db.GetUsersParams{Offset: int32(*params.Offset), Limit: int32(*params.Limit)})

	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
	}

	Respond(c, http.StatusOK, users, "Success", internal.ContentTypeJSON)
}

func (s *Server) PostUsers(c *gin.Context) {
	fmt.Println("Received")
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		Respond(c, http.StatusBadRequest, err, "Invalid", internal.ContentTypeJSON)
		return
	}

	dbUser, err := s.DB.CreateUser(c, user.ToCreateUserParams())

	if err != nil {
		Respond(c, http.StatusInternalServerError, err, "fail", internal.ContentTypeJSON)
		return
	}

	fmt.Println("Sending response")
	Respond(c, http.StatusCreated, dbUser, "success", internal.ContentTypeJSON)
}

func (s *Server) DeleteUsersUserId(c *gin.Context, userId int) {
	fmt.Println("TODO")
}
func (s *Server) GetUsersUserId(c *gin.Context, userId int) {
	fmt.Println("TODO")
}
func (s *Server) PutUsersUserId(c *gin.Context, userId int) {
	fmt.Println("TODO")
}

func (u *User) ToCreateUserParams() db.CreateUserParams {
	return db.CreateUserParams{
		Email:     string(u.Email),
		Username:  u.Username,
		FirstName: pgtype.Text{String: *u.FirstName},
		LastName:  pgtype.Text{String: *u.LastName},
		Password:  u.Password,
		Role:      pgtype.Text{String: "user"},
		Status:    "active",
	}
}
