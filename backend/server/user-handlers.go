package server

import (
	"fmt"
	"net/http"

	"github.com/deanrtaylor1/go-erp-template/api"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
)

func (s *Server) GetUsers(c *gin.Context, params api.GetUsersParams) {

	users, err := s.UserService.GetUsers(c, params)
	if err != nil {
		Respond(c, http.StatusInternalServerError, nil, "Something went wrong.", internal.ContentTypeJSON)
		return
	}

	Respond(c, http.StatusOK, users, "Success", internal.ContentTypeJSON)
}

func (s *Server) PostUsers(c *gin.Context) {
	var user api.UserRequest
	if err := c.ShouldBindJSON(&user); err != nil {
		Respond(c, http.StatusBadRequest, err, "Invalid", internal.ContentTypeJSON)
		return
	}

	response, err := s.UserService.PostUsers(c, user)
	if err != nil {
		Respond(c, http.StatusBadRequest, err, "Something went wrong", internal.ContentTypeJSON)
		return
	}

	Respond(c, http.StatusCreated, response, "Success", internal.ContentTypeJSON)
}

func (s *Server) DeleteUsersUserId(c *gin.Context, userId int) {
	fmt.Println("TODO")
}
func (s *Server) GetUsersUserId(c *gin.Context, userId int) {

	userResponse, err := s.UserService.GetUserByUserId(c, userId)
	if err != nil {
		Respond(c, http.StatusInternalServerError, nil, "Something went wrong.", internal.ContentTypeJSON)
	}

	Respond(c, http.StatusOK, userResponse, "Success", internal.ContentTypeJSON)

}

func (s *Server) PutUsersUserId(c *gin.Context, userId int) {
	Respond(c, 200, nil, "success", internal.ContentTypeJSON)
}
