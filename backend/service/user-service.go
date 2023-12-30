package service

import (
	"fmt"

	"github.com/deanrtaylor1/go-erp-template/api"
	"github.com/deanrtaylor1/go-erp-template/auth"
	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

type UserService interface {
	GetUsers(ctx *gin.Context, params api.GetUsersParams) ([]api.UserResponse, error)
	PostUsers(ctx *gin.Context, userData api.UserRequest) (*api.UserResponse, error)
	GetUserByUserId(ctx *gin.Context, userId int) (*api.UserResponse, error)
}

type userServiceImpl struct {
	store  *db.SQLStore
	logger *internal.Logger
}

func NewUserService(store *db.SQLStore, logger *internal.Logger) UserService {
	return &userServiceImpl{
		store:  store,
		logger: logger,
	}
}

func (s *userServiceImpl) GetUsers(ctx *gin.Context, params api.GetUsersParams) ([]api.UserResponse, error) {
	userRows, err := s.store.Queries.GetUsers(ctx, db.GetUsersParams{Offset: int32(*params.Offset), Limit: int32(*params.Limit)})

	if err != nil {
		return nil, err
	}

	users := make([]api.UserResponse, len(userRows))
	for i, v := range userRows {
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
		users[i] = userResponse
	}

	return users, nil
}

func (s *userServiceImpl) PostUsers(ctx *gin.Context, userData api.UserRequest) (*api.UserResponse, error) {
	hashedPassword, err := auth.HashPassword(userData.Password)
	if err != nil {
		s.logger.Error(fmt.Sprintf("error hashing password %s", err))
		return nil, err
	}

	dbRole, err := s.store.Queries.GetUserRoleByName(ctx, "Employee")
	if err != nil {
		s.logger.Error(fmt.Sprintf("error getting user role %s", err))
		return nil, err
	}

	dbStatus, err := s.store.Queries.GetUserUserStatusByName(ctx, "Active")
	if err != nil {
		s.logger.Error(fmt.Sprintf("error getting user status %s", err))
		return nil, err
	}

	dbUser, err := s.store.Queries.CreateUser(ctx, userData.ToCreateUserParams(hashedPassword))
	if err != nil {
		s.logger.Error(fmt.Sprintf("rror getting creating user %s", err))
		return nil, err
	}

	userResponse := internal.ToUserResponse(dbUser, dbRole.RoleName, dbStatus.StatusName)

	return userResponse, nil
}

func (s *userServiceImpl) GetUserByUserId(ctx *gin.Context, userId int) (*api.UserResponse, error) {
	dbUser, err := s.store.Queries.GetUser(ctx, int32(userId))
	if err != nil {
		s.logger.Error(fmt.Sprintf("error finding user with id: %d. Error: %v", userId, err.Error()))
		return nil, err
	}

	userResponse := internal.GetUserRowToUserResponse(dbUser)

	return userResponse, nil
}
