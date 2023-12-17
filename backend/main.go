package main

import (
	"context"
	"log"

	"github.com/deanrtaylor1/go-erp-template/config"
	"github.com/deanrtaylor1/go-erp-template/server"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	r := gin.Default()

	config.LoadEnv()

	connString := config.Env.Db_URL
	pool, err := pgxpool.New(context.Background(), connString)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer pool.Close()

	s := server.NewServer(r, pool)
	s.Start()
}
