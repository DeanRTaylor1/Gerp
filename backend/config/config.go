package config

import (
	"log"
	"os"
	"path/filepath"
	"strconv"

	"github.com/joho/godotenv"
)

type EnvConfig struct {
	ENV                string
	IsProduction       bool
	IsTest             bool
	IsDevelopment      bool
	BaseUrl            string
	Port               string
	Api_Version        string
	Mongo_Uri          string
	Db_Name            string
	Collection_Email   string
	Collection_Contact string
	Db_URL             string
	Jwt_Secret         string
	Jwt_Duration       int
}

var Env EnvConfig

func LoadEnv() {
	currentDir, err := os.Getwd()
	if err != nil {
		log.Fatalf("Error getting current working directory. Error: %s", err.Error())
	}
	projectRoot := filepath.Join(currentDir)

	env := os.Getenv("GO_ENV")
	if env == "" {
		os.Setenv("GO_ENV", "development")
		env = "development"
	}

	if env != "production" {
		envFilePath := filepath.Join(projectRoot, ".env."+env+".local")
		err := godotenv.Load(envFilePath)
		if err != nil {
			log.Fatalf("Error loading env file. Error: %s", err.Error())
		}
	}

	Env = EnvConfig{
		ENV:                getEnv("GO_ENV", "development"),
		IsProduction:       getEnv("GO_ENV", "production") == "production",
		IsTest:             getEnv("GO_ENV", "test") == "test",
		IsDevelopment:      getEnv("GO_ENV", "development") == "development",
		BaseUrl:            getEnv("BASE_URL", "http://localhost"),
		Port:               getEnv("PORT", "8080"),
		Mongo_Uri:          getEnv("MONGO_URI", ""),
		Api_Version:        getEnv("API_VERSION", "v1"),
		Db_Name:            getEnv("DB_NAME", ""),
		Collection_Email:   getEnv("COLLECTION_EMAIL", ""),
		Collection_Contact: getEnv("COLLECTION_CONTACT", ""),
		Db_URL:             getEnv("DB_URL", "postgres://root:secret@localhost:5432/erp_go?sslmode=disable"),
		Jwt_Secret:         getEnvMandatory("JWT_SECRET"),
		Jwt_Duration:       getEnvAsInt("JWT_DURATION", 24),
	}
}

func getEnv(key, fallback string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		value = fallback
	}
	return value
}

func getEnvAsInt(key string, fallback int) int {
	valueStr, exists := os.LookupEnv(key)
	if !exists {
		return fallback
	}

	value, err := strconv.Atoi(valueStr)
	if err != nil {
		log.Panicf("Environment variable %s must be an integer, got: %s", key, valueStr)
	}

	return value
}
func getEnvMandatory(key string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		log.Fatalf("%s is required to run the server. Have you set env variables", key)
	}
	return value
}
