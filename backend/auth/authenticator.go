package auth

import (
	"time"
)

type Authenticator interface {
	CreateToken(userId int32, email string, role string, duration time.Duration) (string, error)
	VerifyToken(token string) (*Payload, error)
}
