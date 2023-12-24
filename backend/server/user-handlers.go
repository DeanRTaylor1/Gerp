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

	dbRole, err := s.DB.GetUserRoleByName(c, "Employee")
	if err != nil {
		s.Logger.Error(fmt.Sprintf("Error getting user role %s", err))
		Respond(c, http.StatusInternalServerError, err, "Something went wrong", internal.ContentTypeJSON)
		return
	}

	dbStatus, err := s.DB.GetUserUserStatusByName(c, "Active")
	if err != nil {
		s.Logger.Error(fmt.Sprintf("Error getting user status %s", err))
		Respond(c, http.StatusInternalServerError, err, "Something went wrong", internal.ContentTypeJSON)
		return
	}

	dbUser, err := s.DB.CreateUser(c, user.ToCreateUserParams(hashedPassword))
	if err != nil {
		Respond(c, http.StatusInternalServerError, err, "Something went wrong", internal.ContentTypeJSON)
		return
	}

	response := toUserResponse(dbUser, dbRole.RoleName, dbStatus.StatusName)

	Respond(c, http.StatusCreated, response, "Success", internal.ContentTypeJSON)
}

func (s *Server) DeleteUsersUserId(c *gin.Context, userId int) {
	fmt.Println("TODO")
}
func (s *Server) GetUsersUserId(c *gin.Context, userId int) {
	fmt.Println("TODO")
}
func (s *Server) PutUsersUserId(c *gin.Context, userId int) {
	// user, exists := c.Get("user")
	// fmt.Printf("%v", user)
	// if !exists {
	// 	fmt.Println("User not found in context")
	// 	return
	// }

	// fmt.Printf("Retrieved from context: Type=%T, Value=%+v\n", user, user)

	// userData, ok := user.(db.User)
	// if !ok {
	// 	fmt.Println("User data found in context, but type assertion failed")
	// 	return
	// }

	// fmt.Printf("Successfully retrieved user: %+v\n", userData)
	Respond(c, 200, nil, "success", internal.ContentTypeJSON)
}

func toUserResponse(user db.User, userStatus string, userRole string) *api.UserResponse {
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

	email = openapi_types.Email(user.Email)

	return &api.UserResponse{
		Id:        &userId,
		Username:  &username,
		FirstName: firstName,
		Avatar:    &user.Avatar.String,
		LastName:  lastName,
		Email:     &email,
		Role:      &userRole,
		Status:    &userStatus,
		CreatedAt: createdAt,
		UpdatedAt: updatedAt,
	}
}
