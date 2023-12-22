package server

import (
	"fmt"
	"net/http"
	"time"

	"github.com/deanrtaylor1/go-erp-template/api"
	"github.com/deanrtaylor1/go-erp-template/auth"
	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

func (s *Server) GetUsers(c *gin.Context, params api.GetUsersParams) {

	users, err := s.DB.GetUsers(c, db.GetUsersParams{Offset: int32(*params.Offset), Limit: int32(*params.Limit)})

	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
	}

	Respond(c, http.StatusOK, users, "Success", internal.ContentTypeJSON)
}

func (s *Server) PostUsers(c *gin.Context) {
	var user api.UserRequest
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

func toUserResponse(user db.User) *api.UserResponse {
	var createdAt, updatedAt *time.Time
	var firstName, lastName *string
	var email openapi_types.Email
	userId := int64(user.ID)

	username := user.Username
	if user.CreatedAt.Valid {
		createdAt = &user.CreatedAt.Time
	}
	if user.UpdatedAt.Valid {
		updatedAt = &user.UpdatedAt.Time
	}

	if user.FirstName.Valid {
		firstName = &user.FirstName.String
	}
	if user.LastName.Valid {
		lastName = &user.LastName.String
	}

	email = openapi_types.Email(user.Email)

	return &api.UserResponse{
		Id:        &userId,
		Username:  &username,
		FirstName: firstName,
		LastName:  lastName,
		Email:     &email,
		Role:      (*api.UserResponseRole)(&user.Role),
		Status:    (*api.UserResponseStatus)(&user.Status),
		CreatedAt: createdAt,
		UpdatedAt: updatedAt,
	}
}
