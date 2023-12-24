package server

import (
	"embed"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/deanrtaylor1/go-erp-template/api"
	"github.com/deanrtaylor1/go-erp-template/auth"
	"github.com/deanrtaylor1/go-erp-template/config"
	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/getkin/kin-openapi/openapi3filter"
	"github.com/gin-gonic/gin"

	"github.com/jackc/pgx/v5/pgxpool"

	middleware "github.com/oapi-codegen/gin-middleware"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Server struct {
	R             *gin.Engine
	Env           config.EnvConfig
	Logger        *internal.Logger
	DB            *db.Queries
	Authenticator auth.Authenticator
}

func NewServer(r *gin.Engine, dbConn *pgxpool.Pool) *Server {
	Logger, err := internal.NewLogger("logs")
	queries := db.New(dbConn)

	if err != nil {
		panic(err)
	}
	authenticator, err := auth.NewJWTAuthenticator(config.Env.Jwt_Secret)
	if err != nil {
		log.Fatal(err)
	}
	return &Server{
		R:             gin.Default(),
		Env:           config.Env,
		Logger:        Logger,
		DB:            queries,
		Authenticator: authenticator,
	}
}

//go:embed static/index.html
var reactApp embed.FS

func (s *Server) Start() {
	s.initializeSwagger()
	s.registerStaticRoutes()

	zipper := NewZipper()

	s.R.Use(GzipMiddleware(zipper))

	mw := s.GetMiddleware()

	swagger, err := api.GetSwagger()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error loading swagger spec\n: %s", err)
		os.Exit(1)
	}
	openAPIAuthFunc := auth.OpenAPIAuthFunc(s.Authenticator, s.DB)

	validationOpts := &middleware.Options{
		ErrorHandler: validationErrorHandler,
		Options: openapi3filter.Options{
			AuthenticationFunc: openAPIAuthFunc,
		},
	}

	s.R.Use(CustomOpenAPIValidationMiddleware(swagger, *validationOpts))

	opts := s.GetOptions(mw)
	api.RegisterHandlersWithOptions(s.R, s, *opts)

	s.R.Run()
}

func (s *Server) GetMiddleware() []api.MiddlewareFunc {
	mw := []api.MiddlewareFunc{}
	// mw = append(mw, s.getErrorHandlerMiddleware())

	return mw
}

func (s *Server) initializeSwagger() {
	s.R.StaticFile("/api/v1/openapi/api-v1.yaml", "./api/openapi/api-v1.yaml")
	swaggerURL := ginSwagger.URL("/api/v1/openapi/api-v1.yaml")
	s.R.GET("/api/v1/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, swaggerURL))
}

func (s *Server) registerStaticRoutes() {
	s.R.GET("/assets/*filepath", ServeAssets)

	s.R.NoRoute(func(c *gin.Context) {
		fmt.Println(c.Request.URL.Path)
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

func (s *Server) serveReact() func(c *gin.Context) {
	return func(c *gin.Context) {
		file, err := reactApp.ReadFile("static/index.html")
		if err != nil {
			c.Status(http.StatusInternalServerError)
			// Log the error here
			return
		}
		c.Data(http.StatusOK, "text/html; charset=utf-8", file)
	}
}

//go:embed static/assets/*
var assetFiles embed.FS

func ServeAssets(c *gin.Context) {
	filepath := c.Param("filepath")
	fullImagePath := "static/assets" + filepath

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
