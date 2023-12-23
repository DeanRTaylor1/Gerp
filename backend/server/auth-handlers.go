package server

import (
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
		Respond(c, http.StatusBadRequest, err, "Invalid", internal.ContentTypeJSON)
		return
	}

	dbUser, err := s.DB.GetUserByEmail(c, loginProps.Email)
	if err != nil {
		Respond(c, http.StatusUnauthorized, nil, "Unauthorized", internal.ContentTypeJSON)
		return
	}

	err = auth.CheckPassword(loginProps.Password, dbUser.Password)
	if err != nil {
		Respond(c, http.StatusUnauthorized, nil, "Unauthorized", internal.ContentTypeJSON)
		return
	}

	duration := time.Duration(s.Env.Jwt_Duration) * time.Hour

	accesToken, err := s.Authenticator.CreateToken(dbUser.Email, duration)
	if err != nil {
		Respond(c, http.StatusInternalServerError, nil, "Something went wrong.", internal.ContentTypeJSON)
		return
	}
	response := toLoginUserResponse(accesToken)

	Respond(c, http.StatusCreated, response, "success", internal.ContentTypeJSON)
}

func toLoginUserResponse(accesToken string) *api.AccessTokenResponse {
	return &api.AccessTokenResponse{
		AccessToken: accesToken,
	}
}
