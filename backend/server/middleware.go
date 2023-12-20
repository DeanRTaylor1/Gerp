package server

import (
	"compress/gzip"
	"fmt"
	"io"
	"net/http"
	"path/filepath"
	"strings"
	"sync"

	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
)

func (s *Server) getErrorHandlerMiddleware() func(c *gin.Context) {
	return func(c *gin.Context) {
		c.Next()

		for _, err := range c.Errors {
			s.Logger.Error(fmt.Sprintf("Error: %s", err.Error()))
		}

		if len(c.Errors) > 0 {
			Respond(c, http.StatusBadRequest, nil, "An Error occurred.", internal.ContentTypeJSON)
			return
		}

	}
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
