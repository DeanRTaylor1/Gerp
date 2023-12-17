package server

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func (s *Server) GetOptions(mw []MiddlewareFunc) *GinServerOptions {
	return &GinServerOptions{
		BaseURL:      fmt.Sprintf("api/%s", s.Env.Api_Version),
		Middlewares:  mw,
		ErrorHandler: ErrorHandler,
	}
}

func ErrorHandler(c *gin.Context, err error, statusCode int) {

	if statusCode >= 500 {
		c.JSON(statusCode, gin.H{"error": "Internal Server Error"})
	} else {
		c.JSON(statusCode, gin.H{"error": err.Error()})
	}
}
