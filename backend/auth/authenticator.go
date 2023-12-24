package auth

import (
	"time"
)

type Authenticator interface {
	CreateToken(email string, role string, duration time.Duration) (string, error)
	VerifyToken(token string) (*Payload, error)
}
