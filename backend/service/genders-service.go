package service

import (
	"fmt"

	"github.com/deanrtaylor1/go-erp-template/api"
	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
)

type GendersService interface {
	GetGenders(ctx *gin.Context, params api.GetGendersParams) ([]api.GenderResponse, error)
}

type gendersServiceImpl struct {
	logger *internal.Logger
	store  *db.SQLStore
}

func NewGendersService(logger *internal.Logger, store *db.SQLStore) GendersService {
	return &gendersServiceImpl{
		logger: logger,
		store:  store,
	}
}

func (s *gendersServiceImpl) GetGenders(ctx *gin.Context, params api.GetGendersParams) ([]api.GenderResponse, error) {
	genders, err := s.store.Queries.GetGenders(ctx, db.GetGendersParams{
		Offset: int32(*params.Offset),
		Limit:  int32(*params.Limit),
	})
	if err != nil {
		s.logger.Error(fmt.Sprintf("error getting genders error: %v", err.Error()))
		return nil, err
	}

	responseData := make([]api.GenderResponse, len(genders))
	for i, v := range genders {
		genderName := v.GenderName
		genderId := int64(v.ID)

		genderResponse := api.GenderResponse{
			GenderName: &genderName,
			Id:         &genderId,
		}

		responseData[i] = genderResponse
	}

	return responseData, nil
}
