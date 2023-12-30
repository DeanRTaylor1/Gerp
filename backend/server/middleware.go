package server

import (
	"compress/gzip"
	"fmt"
	"io"
	"net/http"
	"path/filepath"
	"regexp"
	"strings"
	"sync"

	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/getkin/kin-openapi/openapi3"
	"github.com/gin-gonic/gin"
	middleware "github.com/oapi-codegen/gin-middleware"
)

func customErrorHandler(c *gin.Context, err error, statusCode int) {
	formattedError := "An error occurred"

	c.JSON(statusCode, gin.H{"error": formattedError})
}

func CustomOpenAPIValidationMiddleware(swagger *openapi3.T, opts middleware.Options) gin.HandlerFunc {
	validatorMiddleware := middleware.OapiRequestValidatorWithOptions(swagger, &opts)
	fmt.Println("CHecking")

	return func(c *gin.Context) {
		bypassPaths := map[string]bool{
			"/":            true,
			"/about":       true,
			"/users":       true,
			"/assets":      true,
			"/favicon.ico": true,
		}

		if _, ok := bypassPaths[c.Request.URL.Path]; ok {
			c.Next()
			return
		}

		validatorMiddleware(c)
	}
}

func validationErrorHandler(c *gin.Context, message string, statusCode int) {
	formattedError := "An error occurred"

	isValidationError := strings.Contains(message, "openapi3filter.RequestError")
	if isValidationError {
		formattedError = formatOpenAPIError(message)
	}

	if isAuthError := strings.Contains(message, "authorization header is required") || strings.Contains(message, "invalid scopes"); isAuthError {
		formattedError = "Unauthorized"
		Respond(c, http.StatusUnauthorized, nil, formattedError, internal.ContentTypeJSON)
		return
	}
	fmt.Printf("%v", message)
	Respond(c, http.StatusBadRequest, nil, formattedError, internal.ContentTypeJSON)
}

func formatOpenAPIError(msg string) string {
	re := regexp.MustCompile(`Error at "/?(.*?)": (.*)`)
	matches := re.FindStringSubmatch(msg)

	if len(matches) < 3 {
		return "Invalid input"
	}

	// Remove leading "/" from the field name
	field := strings.TrimPrefix(matches[1], "/")
	message := matches[2]
	return fmt.Sprintf("Invalid input for %s: %s", field, message)
}

type ZipperOptions struct {
	Exclusions Exclusions
}
type Zipper struct {
	ZipPool sync.Pool
	Options *ZipperOptions
}

func GetZipperOpts() *ZipperOptions {
	return &ZipperOptions{
		Exclusions: *GetExclusions(),
	}
}

func (z *Zipper) canSkipCompression(c *gin.Context) bool {
	ext := filepath.Ext(c.Request.URL.Path)
	return z.Options.Exclusions.Contains(ext)
}

type Exclusions map[string]bool

func (e Exclusions) Contains(target string) bool {
	_, ok := e[target]
	return ok
}

func GetExclusions() *Exclusions {
	ext := []string{".jpg", ".png", ".gif", "jpeg"}

	exclusions := make(Exclusions)

	for _, v := range ext {
		exclusions[v] = true
	}

	return &exclusions
}

func NewZipper() *Zipper {
	return &Zipper{
		ZipPool: sync.Pool{
			New: func() interface{} {
				return gzip.NewWriter(io.Discard)
			},
		},
		Options: GetZipperOpts(),
	}
}

func GzipMiddleware(zipper *Zipper) gin.HandlerFunc {
	return func(c *gin.Context) {
		if !zipper.canSkipCompression(c) && strings.Contains(c.Request.Header.Get("Accept-Encoding"), "gzip") {
			ext := filepath.Ext(c.Request.URL.Path)
			if zipper.Options.Exclusions.Contains(ext) {
				c.Next()
				return
			}
			gw := zipper.ZipPool.Get().(*gzip.Writer)

			defer zipper.ZipPool.Put(gw)
			defer gw.Reset(io.Discard)
			c.Header("Content-Encoding", "gzip")
			gw.Reset(c.Writer)
			gzippedResponseWriter := &gzipResponseWriter{c.Writer, gw}
			c.Writer = gzippedResponseWriter
			defer gw.Close()

			c.Next()
		} else {
			c.Next()
		}
	}
}

type gzipResponseWriter struct {
	gin.ResponseWriter
	writer *gzip.Writer
}

func (g *gzipResponseWriter) Write(data []byte) (int, error) {
	return g.writer.Write(data)
}
