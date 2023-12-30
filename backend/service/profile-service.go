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
	fmt.Printf("%v", profileReq)

	if user.ID != int32(profileReq.UserId) && user.RoleName != "Administrator" {
		s.logger.Error(fmt.Sprintf("Update Rejected: Current User: %d Trying to update User: %d. Current USers Role: %s", user.ID, profileReq.UserId, user.RoleName))
		return errors.New("Unauthorized")
	}

	_, err := s.store.Queries.GetMaritalStatus(ctx, int32(profileReq.MaritalStatusId))
	if err != nil {
		return errors.New("invalid marital status")
	}

	profileId := internal.Int64ToPGInt4(profileReq.Id)
	addresses, err := s.store.Queries.GetAddressesByProfileId(ctx, profileId)
	if err != nil {
		return err
	}

	profileUpdate := internal.ConvertToUpdateProfileParams(profileReq)

	txFunc := func(q *db.Queries) error {
		err := s.store.Queries.UpdateProfile(ctx, profileUpdate)
		if err != nil {
			return err
		}
		if len(addresses) >= 1 {
			addressUpdate := internal.ConvertToUpdateAddressParams(profileReq)
			err = s.store.Queries.UpdateAddress(ctx, addressUpdate)
			if err != nil {
				return err
			}
		} else {
			addressCreateParams := internal.ConvertProfileRequestToUpdateCreateAddressParams(profileReq)
			_, err = s.store.Queries.CreateAddress(ctx, addressCreateParams)
			if err != nil {
				return err
			}
		}

		return nil
	}

	err = s.store.ExecTx(ctx, txFunc)
	if err != nil {
		s.logger.Error(fmt.Sprintf("%v", err.Error()))
		return err
	}
	return nil
}
