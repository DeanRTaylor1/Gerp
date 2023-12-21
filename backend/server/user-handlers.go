package server

import (
	"fmt"
	"net/http"

	"github.com/deanrtaylor1/go-erp-template/api"
	"github.com/deanrtaylor1/go-erp-template/auth"
	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
)

func (s *Server) GetUsers(c *gin.Context, params api.GetUsersParams) {

	users, err := s.DB.GetUsers(c, db.GetUsersParams{Offset: int32(*params.Offset), Limit: int32(*params.Limit)})

	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
	}

	Respond(c, http.StatusOK, users, "Success", internal.ContentTypeJSON)
}

func (s *Server) PostUsers(c *gin.Context) {
	var user api.User
	if err := c.ShouldBindJSON(&user); err != nil {
		Respond(c, http.StatusBadRequest, err, "Invalid", internal.ContentTypeJSON)
		return
	}

	hashedPassword, err := auth.HashPassword(user.Password)
	if err != nil {
		Respond(c, http.StatusInternalServerError, err, "Something went wrong", internal.ContentTypeJSON)
		return
	}

	dbUser, err := s.DB.CreateUser(c, user.ToCreateUserParams(hashedPassword))
	if err != nil {
		Respond(c, http.StatusInternalServerError, err, "Something went wrong", internal.ContentTypeJSON)
		return
	}

	response := toUserResponse(dbUser)

	Respond(c, http.StatusCreated, response, "Success", internal.ContentTypeJSON)
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

type userResponse struct {
	ID        int32
	Username  string
	FirstName string
	LastName  string
	Email     string
	Status    string
	Role      string
	CreatedAt pgtype.Timestamptz `json:"created_at"`
	UpdatedAt pgtype.Timestamptz `json:"updated_at"`
}

func toUserResponse(user db.User) *userResponse {
	return &userResponse{ID: user.ID, Username: user.Username, FirstName: user.FirstName.String, LastName: user.LastName.String, Email: user.Email, Role: string(user.Role), Status: string(user.Status)}

}
