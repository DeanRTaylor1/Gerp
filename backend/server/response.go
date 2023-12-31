package server

import (
	"github.com/gin-gonic/gin"
)

type ApiResponse struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

func Respond(c *gin.Context, status int, data interface{}, message string, cType string) {
	c.Header("Content-Type", cType)

	c.JSON(status, ApiResponse{
		Status:  status,
		Data:    data,
		Message: message,
	})
}
