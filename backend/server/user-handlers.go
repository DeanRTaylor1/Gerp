package server

import (
	"fmt"
	"net/http"

	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/gin-gonic/gin"
)

func (s *Server) GetUsers(c *gin.Context, params GetUsersParams) {
	fmt.Printf("%d %d", *params.Limit, *params.Offset)

	users, err := s.DB.GetUsers(c, db.GetUsersParams{Offset: int32(*params.Offset), Limit: int32(*params.Limit)})

	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
	}

	Respond(c, http.StatusOK, users, "Success")
}

func (s *Server) PostUsers(c *gin.Context) {
	fmt.Println("TODO")
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
