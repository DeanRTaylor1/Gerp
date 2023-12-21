package server

import (
	"fmt"

	"github.com/deanrtaylor1/go-erp-template/api"
	"github.com/gin-gonic/gin"
)

func (s *Server) GetOptions(mw []api.MiddlewareFunc) *api.GinServerOptions {
	return &api.GinServerOptions{
		BaseURL:      fmt.Sprintf("api/%s", s.Env.Api_Version),
		Middlewares:  nil,
		ErrorHandler: customErrorHandler,
	}
}

func ErrorHandler(c *gin.Context, err error, statusCode int) {

	if statusCode >= 500 {
		c.JSON(statusCode, gin.H{"error": "Internal Server Error"})
		return
	} else {
		c.JSON(statusCode, gin.H{"error": err.Error()})
		return
	}
}
