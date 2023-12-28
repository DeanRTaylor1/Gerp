package server

import (
	"fmt"
	"net/http"
	"time"

	"github.com/deanrtaylor1/go-erp-template/api"
	"github.com/deanrtaylor1/go-erp-template/auth"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
)

func (s *Server) PostAuth(c *gin.Context) {
	var loginProps api.LoginUserRequest
	if err := c.ShouldBindJSON(&loginProps); err != nil {
		fmt.Println("Login props error")
		Respond(c, http.StatusBadRequest, err, "Invalid", internal.ContentTypeJSON)
		return
	}

	dbUser, err := s.DB.GetUserByEmail(c, loginProps.Email)
	if err != nil {
		fmt.Println("Get User not found")
		Respond(c, http.StatusUnauthorized, nil, "Unauthorized", internal.ContentTypeJSON)
		return
	}

	err = auth.CheckPassword(loginProps.Password, dbUser.Password)
	if err != nil {
		fmt.Println("password check failed")
		Respond(c, http.StatusUnauthorized, nil, "Unauthorized", internal.ContentTypeJSON)
		return
	}

	duration := time.Duration(s.Env.Jwt_Duration) * time.Hour

	accessToken, err := s.Authenticator.CreateToken(dbUser.ID, dbUser.Email, dbUser.RoleName, duration)
	if err != nil {
		Respond(c, http.StatusInternalServerError, nil, "Something went wrong.", internal.ContentTypeJSON)
		return
	}
	response := toLoginUserResponse(accessToken)

	Respond(c, http.StatusCreated, response, "success", internal.ContentTypeJSON)
}

func toLoginUserResponse(accesToken string) *api.AccessTokenResponse {
	return &api.AccessTokenResponse{
		AccessToken: accesToken,
	}
}
