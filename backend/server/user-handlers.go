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
	"github.com/jackc/pgx/v5/pgtype"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

type UserLike struct {
	ID        int32            `json:"id"`
	Username  string           `json:"username"`
	FirstName string           `json:"first_name"`
	LastName  string           `json:"last_name"`
	Email     string           `json:"email"`
	Password  string           `json:"password"`
	Avatar    pgtype.Text      `json:"avatar"`
	CreatedAt pgtype.Timestamp `json:"created_at"`
	UpdatedAt pgtype.Timestamp `json:"updated_at"`
}

func (s *Server) GetUsers(c *gin.Context, params api.GetUsersParams) {

	users, err := s.DB.GetUsers(c, db.GetUsersParams{Offset: int32(*params.Offset), Limit: int32(*params.Limit)})

	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
	}

	data := make([]api.UserResponse, len(users))
	for i, v := range users {
		userID := int64(v.ID)
		userEmail := openapi_types.Email(v.Email)
		username := v.Username
		firstName := v.FirstName
		avatar := v.Avatar.String
		lastName := v.LastName
		role := v.RoleName
		status := v.StatusName
		createdAt := v.CreatedAt.Time
		updatedAt := v.UpdatedAt.Time

		userResponse := api.UserResponse{
			Id:        &userID,
			Username:  &username,
			FirstName: &firstName,
			Avatar:    &avatar,
			LastName:  &lastName,
			Email:     &userEmail,
			Role:      &role,
			Status:    &status,
			CreatedAt: &createdAt,
			UpdatedAt: &updatedAt,
		}
		data[i] = userResponse
	}

	Respond(c, http.StatusOK, data, "Success", internal.ContentTypeJSON)
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
	dbUser, err := s.DB.GetUser(c, int32(userId))
	if err != nil {
		Respond(c, http.StatusBadRequest, nil, "Something went wrong", internal.ContentTypeJSON)
		return
	}

	userResponse := getUserRowToUserResponse(dbUser)
	Respond(c, http.StatusAccepted, userResponse, "Success", internal.ContentTypeJSON)

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

func ptrInt64(v int32) *int64 {
	r := int64(v)
	return &r
}

func ptrString(v string) *string { return &v }

func getUserRowToUserResponse(dbUser db.GetUserRow) *api.UserResponse {
	return &api.UserResponse{
		Id:        ptrInt64(dbUser.ID),
		Username:  ptrString(dbUser.Username),
		FirstName: ptrString(dbUser.FirstName),
		LastName:  ptrString(dbUser.LastName),
		Email:     (*openapi_types.Email)(ptrString(dbUser.Email)),
		Avatar:    ptrString(dbUser.Avatar.String),
		Role:      ptrString(dbUser.RoleName),
		Status:    ptrString(dbUser.StatusName),
		CreatedAt: ptrTime(dbUser.CreatedAt),
		UpdatedAt: ptrTime(dbUser.UpdatedAt),
	}
}

func ptrTime(t pgtype.Timestamp) *time.Time {
	if t.Valid {
		return &t.Time
	}
	return nil
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
