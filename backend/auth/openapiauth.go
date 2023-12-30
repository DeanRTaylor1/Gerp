package auth

import (
	"context"
	"errors"
	"fmt"
	"slices"
	"strings"

	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/getkin/kin-openapi/openapi3filter"
	"github.com/jackc/pgx/v5"
	middleware "github.com/oapi-codegen/gin-middleware"
)

type contextKey string

const UserPayloadKey contextKey = "userPayload"

func OpenAPIAuthFunc(authenticator Authenticator, q db.Querier) openapi3filter.AuthenticationFunc {
	return func(ctx context.Context, input *openapi3filter.AuthenticationInput) error {
		fmt.Println("Checking auth")
		req := input.RequestValidationInput.Request
		ginCtx := middleware.GetGinContext(ctx)
		authHeader := req.Header.Get("Authorization")
		fmt.Println(authHeader)
		if authHeader == "" {
			return fmt.Errorf("authorization header is required")
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		payload, err := authenticator.VerifyToken(tokenString)
		if err != nil {
			return fmt.Errorf("invalid or expired token: %w", err)
		}

		fmt.Println(payload)
		email := payload.Email
		user, err := q.GetUserByEmail(ctx, email)
		if err != nil {
			if errors.Is(err, pgx.ErrNoRows) {
				return fmt.Errorf("user not found")
			}
			return fmt.Errorf("database error: %w", err)
		}

		scopes := input.Scopes
		fmt.Printf("%v", scopes)
		if len(scopes) > 0 && user.RoleName != "Administrator" {
			if !slices.Contains(scopes, user.RoleName) {
				return fmt.Errorf("invalid scopes %w", err)
			}
		}

		fmt.Println(user)
		ginCtx.Set("user", user)

		return nil
	}
}
