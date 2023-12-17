package main

import (
	"github.com/deanrtaylor1/go-erp-template/server"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {
	r := gin.Default()
	s := server.NewServer()

	server.RegisterHandlers(r, s)
	r.StaticFile("/api/v1/openapi/api-v1.yaml", "./api/openapi/api-v1.yaml")
	swaggerURL := ginSwagger.URL("/api/v1/openapi/api-v1.yaml")

	r.GET("api/v1/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, swaggerURL))

	r.Run()

}
