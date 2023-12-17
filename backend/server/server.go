package server

import (
	"embed"
	"fmt"
	"net/http"
	"strings"

	"github.com/deanrtaylor1/go-erp-template/config"
	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Server struct {
	R      *gin.Engine
	Env    config.EnvConfig
	Logger *internal.Logger
	DB     *db.Queries
}

func NewServer(r *gin.Engine, dbConn *pgxpool.Pool) *Server {
	Logger, err := internal.NewLogger("logs")
	queries := db.New(dbConn)

	if err != nil {
		panic(err)
	}
	return &Server{
		R:      gin.Default(),
		Env:    config.Env,
		Logger: Logger,
		DB:     queries,
	}
}

//go:embed static/index.html
var reactApp embed.FS

func (s *Server) Start() {
	s.registerStaticRoutes()
	s.initializeSwagger()

	mw := s.GetMiddleware()
	opts := s.GetOptions(mw)
	RegisterHandlersWithOptions(s.R, s, *opts)

	s.R.Run()
}

func (s *Server) GetMiddleware() []MiddlewareFunc {
	return []MiddlewareFunc{s.getErrorHandlerMiddleware()}
}

func (s *Server) initializeSwagger() {
	s.R.StaticFile("/api/v1/openapi/api-v1.yaml", "./api/openapi/api-v1.yaml")
	swaggerURL := ginSwagger.URL("/api/v1/openapi/api-v1.yaml")
	s.R.GET("/api/v1/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, swaggerURL))
}

func (s *Server) registerStaticRoutes() {
	s.R.GET("/assets/*filepath", ServeAssets)

	s.R.GET("/", func(c *gin.Context) {
		file, err := reactApp.ReadFile("static/index.html")
		if err != nil {
			c.Status(http.StatusInternalServerError)
			// Log the error here
			return
		}
		c.Data(http.StatusOK, "text/html; charset=utf-8", file)
	})

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
}

//go:embed static/assets/*
var assetFiles embed.FS

func ServeAssets(c *gin.Context) {
	filepath := c.Param("filepath")
	fullImagePath := "static/assets" + filepath

	fmt.Println(fullImagePath)

	file, err := assetFiles.ReadFile(fullImagePath)
	if err != nil {
		c.Status(http.StatusNotFound)
		return
	}

	contentType := internal.GetContentTypeByFileExtension(filepath)
	c.Writer.Header().Set("Content-Type", contentType)
	c.Writer.WriteHeader(http.StatusOK)
	c.Writer.Write(file)
}
