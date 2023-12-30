package service

import (
	"fmt"

	"github.com/deanrtaylor1/go-erp-template/api"
	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
)

type MaritalStatusService interface {
	GetMaritalStatuses(ctx *gin.Context, params api.GetMaritalStatusesParams) ([]api.MaritalStatusesResponse, error)
}

type maritalStatusServiceImpl struct {
	logger *internal.Logger
	store  *db.SQLStore
}

func NewMaritalStatusService(logger *internal.Logger, store *db.SQLStore) MaritalStatusService {
	return &maritalStatusServiceImpl{
		logger: logger,
		store:  store,
	}
}

func (s *maritalStatusServiceImpl) GetMaritalStatuses(ctx *gin.Context, params api.GetMaritalStatusesParams) ([]api.MaritalStatusesResponse, error) {
	maritalStatusesRows, err := s.store.Queries.GetMaritalStatuses(ctx, db.GetMaritalStatusesParams{Offset: int32(*params.Offset), Limit: int32(*params.Limit)})
	if err != nil {
		s.logger.Error(fmt.Sprintf("Error getting maritalStatuses, error: %v", err.Error()))
		return nil, err
	}

	maritalStatuses := make([]api.MaritalStatusesResponse, len(maritalStatusesRows))

	for i, v := range maritalStatusesRows {
		id := int64(v.ID)
		statusName := v.StatusName

		maritalStatuses[i] = api.MaritalStatusesResponse{Id: &id, StatusName: &statusName}
	}

	return maritalStatuses, nil
}
