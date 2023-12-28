package auth

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

var (
	ErrExpiredToken = errors.New("token has expired")
	ErrInvalidToken = errors.New("token is invalid")
)

// Payload structure aligning with standard JWT claims
type Payload struct {
	ID     uuid.UUID `json:"id"`
	UserId int32     `json:"user_id"`
	Email  string    `json:"email"`
	Role   string    `json:"roles"`
	Iat    int64     `json:"iat"` // Issued at, Unix time
	Exp    int64     `json:"exp"` // Expiration time, Unix time
}

func NewPayload(userId int32, email string, role string, duration time.Duration) (*Payload, error) {
	tokenID, err := uuid.NewRandom()
	if err != nil {
		return nil, err
	}

	now := time.Now().Unix()
	exp := time.Now().Add(duration).Unix()

	payload := &Payload{
		ID:     tokenID,
		UserId: userId,
		Email:  email,
		Role:   role,
		Iat:    now,
		Exp:    exp,
	}

	return payload, nil
}

func (payload *Payload) Valid() error {
	if time.Now().Unix() > payload.Exp {
		return ErrExpiredToken
	}
	return nil
}
