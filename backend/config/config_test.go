package config

import (
	"os"
	"testing"
)

func TestLoadEnv(t *testing.T) {
	os.Setenv("GO_ENV", "test")

	defer os.Unsetenv("GO_ENV")

	LoadEnv()

	if Env.ENV != "test" {
		t.Errorf("Expected Env.ENV to be 'test', got '%s'", Env.ENV)
	}
	if !Env.IsTest {
		t.Error("Expected Env.IsTest to be true, got false")
	}
	if Env.IsProduction {
		t.Error("Expected Env.IsProduction to be false, got true")
	}
	if Env.IsDevelopment {
		t.Error("Expected Env.IsDevelopment to be false, got true")
	}
}

func TestGetEnv(t *testing.T) {
	os.Setenv("GO_ENV", "test")

	LoadEnv()

	result := getEnv("NON_EXISTENT_KEY", "default_value")
	if result != "default_value" {
		t.Errorf("Expected getEnv to return 'default_value', got '%s'", result)
	}

	result = getEnv("PORT", "Port is not defined")
	if result != "8080" {
		t.Errorf("Expected port to return 8080 but got, '%s'", result)
	}

	os.Setenv("GO_ENV", "")
	defer os.Setenv("GO_ENV", "test")

	LoadEnv()
	if Env.ENV != "development" {
		t.Errorf("Expected default env to be development but got:, '%s'", Env.ENV)
	}

}
