package server

import (
	"fmt"
	"net/http"

	"github.com/deanrtaylor1/go-erp-template/api"
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

	response, err := s.AuthService.PostAuth(c, loginProps)
	if err != nil {
		Respond(c, http.StatusInternalServerError, nil, "Something went wrong", internal.ContentTypeJSON)
	}

	Respond(c, http.StatusCreated, response, "success", internal.ContentTypeJSON)
}
