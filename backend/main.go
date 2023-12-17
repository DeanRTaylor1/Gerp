package main

import (
	"github.com/deanrtaylor1/go-erp-template/server"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	s := server.NewServer(r)
	s.Start()
}
