package server

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (s *Server) getErrorHandlerMiddleware() func(c *gin.Context) {
	return func(c *gin.Context) {
		c.Next()

		for _, err := range c.Errors {
			s.Logger.Error(fmt.Sprintf("Error: %s", err.Error()))
		}

		if len(c.Errors) > 0 {
			Respond(c, http.StatusBadRequest, nil, "An Error occurred.")
			return
		}

	}
}
