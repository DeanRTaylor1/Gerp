package server

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

type Server struct {
}

func NewServer() *Server {
	return &Server{}
}
func (s *Server) GetUsers(c *gin.Context) {
	fmt.Println("TODO")
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
