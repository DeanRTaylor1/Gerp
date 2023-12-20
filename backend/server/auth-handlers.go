package server

import (
	"github.com/gin-gonic/gin"
)

func (s *Server) PostAuth(c *gin.Context) {
	// var user api.Login
	// if err := c.ShouldBindJSON(&user); err != nil {
	// 	Respond(c, http.StatusBadRequest, err, "Invalid", internal.ContentTypeJSON)
	// 	return
	// }

	// dbUser, err := s.DB.CreateUser(c, user.ToCreateUserParams())

	// if err != nil {
	// 	Respond(c, http.StatusInternalServerError, err, "fail", internal.ContentTypeJSON)
	// 	return
	// }

	// response := toUserResponse(dbUser)

	// Respond(c, http.StatusCreated, response, "success", internal.ContentTypeJSON)
}

type loginUserResponse struct {
	AccessToken string       `json:"access_token"`
	User        userResponse `json:"user"`
}
