package service

import (
	"fmt"
	"time"

	"github.com/deanrtaylor1/go-erp-template/api"
	"github.com/deanrtaylor1/go-erp-template/auth"
	"github.com/deanrtaylor1/go-erp-template/config"
	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
)

type AuthService interface {
	PostAuth(ctx *gin.Context, loginProps api.LoginUserRequest) (*api.AccessTokenResponse, error)
}

type authServiceImpl struct {
	store         *db.SQLStore
	logger        *internal.Logger
	authenticator auth.Authenticator
	env           *config.EnvConfig
}

func NewAuthService(store *db.SQLStore, logger *internal.Logger, authenticator auth.Authenticator, env *config.EnvConfig) AuthService {
	return &authServiceImpl{
		store:         store,
		logger:        logger,
		authenticator: authenticator,
		env:           env,
	}
}

func (s *authServiceImpl) PostAuth(ctx *gin.Context, loginProps api.LoginUserRequest) (*api.AccessTokenResponse, error) {
	dbUser, err := s.store.Queries.GetUserByEmail(ctx, loginProps.Email)
	if err != nil {
		fmt.Println("Get User not found")
		return nil, err
	}

	err = auth.CheckPassword(loginProps.Password, dbUser.Password)
	if err != nil {
		fmt.Println("password check failed")
		return nil, err
	}

	duration := time.Duration(s.env.Jwt_Duration) * time.Hour

	accessToken, err := s.authenticator.CreateToken(dbUser.ID, dbUser.Email, dbUser.RoleName, duration)
	if err != nil {
		return nil, err
	}

	response := internal.ToLoginUserResponse(accessToken)

	return response, nil
}
