package service

import (
	"errors"
	"fmt"

	"github.com/deanrtaylor1/go-erp-template/api"
	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
)

type ProfileService interface {
	UpdateProfile(ctx *gin.Context, user db.GetUserByEmailRow, profileReq api.PutProfilesJSONRequestBody) error
}

type profileServiceImpl struct {
	store  *db.SQLStore
	logger *internal.Logger
}

func NewProfileService(store *db.SQLStore, logger *internal.Logger) ProfileService {
	return &profileServiceImpl{
		store:  store,
		logger: logger,
	}
}

func (s *profileServiceImpl) UpdateProfile(ctx *gin.Context, user db.GetUserByEmailRow, profileReq api.PutProfilesJSONRequestBody) error {

	if user.ID != int32(profileReq.UserId) && user.RoleName != "Administrator" {
		s.logger.Error(fmt.Sprintf("Update Rejected: Current User: %d Trying to update User: %d. Current USers Role: %s", user.ID, profileReq.UserId, user.RoleName))
		return errors.New("Unauthorized")
	}

	addressUpdate := internal.ConvertToUpdateAddressParams(profileReq)
	profileUpdate := internal.ConvertToUpdateProfileParams(profileReq)

	txFunc := func(q *db.Queries) error {
		err := s.store.Queries.UpdateAddress(ctx, addressUpdate)
		if err != nil {
			return err
		}
		err = s.store.Queries.UpdateProfile(ctx, profileUpdate)
		if err != nil {
			return err
		}
		return nil
	}

	err := s.store.ExecTx(ctx, txFunc)
	if err != nil {
		s.logger.Error(fmt.Sprintf("%v", err.Error()))
		return err
	}
	return nil
}
