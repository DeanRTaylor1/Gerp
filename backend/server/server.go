package server

import (
	"embed"
	"fmt"
	"net/http"
	"strings"

	"github.com/deanrtaylor1/go-erp-template/utils"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Server struct {
	R *gin.Engine
}

func NewServer(r *gin.Engine) *Server {
	return &Server{
		R: gin.Default(),
	}
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

//go:embed static/index.html
var reactApp embed.FS

func (s *Server) Start() {
	RegisterHandlers(s.R, s)
	s.R.StaticFile("/api/v1/openapi/api-v1.yaml", "./api/openapi/api-v1.yaml")
	swaggerURL := ginSwagger.URL("/api/v1/openapi/api-v1.yaml")

	s.R.GET("/assets/*filepath", ServeAssets)
	s.R.GET("/api/v1/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, swaggerURL))

	// Serve embedded index.html
	s.R.GET("/", func(c *gin.Context) {
		file, err := reactApp.ReadFile("static/index.html")
		if err != nil {
			c.Status(http.StatusInternalServerError)
			// Log the error here
			return
		}
		c.Data(http.StatusOK, "text/html; charset=utf-8", file)
	})

	// Serve index.html for any other routes (for client-side routing)
	s.R.NoRoute(func(c *gin.Context) {
		if !strings.HasPrefix(c.Request.URL.Path, "/api") {
			file, err := reactApp.ReadFile("static/index.html")
			if err != nil {
				c.Status(http.StatusInternalServerError)
				// Log the error here
				return
			}
			c.Data(http.StatusOK, "text/html; charset=utf-8", file)
		} else {
			c.Status(http.StatusNotFound)
		}
	})

	s.R.Run()
}

//go:embed static/assets/*
var assetFiles embed.FS

func ServeAssets(c *gin.Context) {
	filepath := c.Param("filepath") // Assuming the parameter is named "filepath"
	fullImagePath := "static/assets" + filepath

	fmt.Println(fullImagePath)

	file, err := assetFiles.ReadFile(fullImagePath)
	if err != nil {
		c.Status(http.StatusNotFound)
		// Log the error here
		return
	}

	contentType := utils.GetContentTypeByFileExtension(filepath)
	c.Writer.Header().Set("Content-Type", contentType)
	c.Writer.WriteHeader(http.StatusOK)
	c.Writer.Write(file)
}
