package auth

import (
	"time"

	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
)

type Authenticator interface {
	CreateToken(email string, role db.UserRole, duration time.Duration) (string, error)
	VerifyToken(token string) (*Payload, error)
}
