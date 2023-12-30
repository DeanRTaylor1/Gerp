package server

import (
	"fmt"
	"net/http"

	"github.com/deanrtaylor1/go-erp-template/api"
	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
)

func (s *Server) PutProfiles(c *gin.Context) {

	var profileReq api.PutProfilesJSONRequestBody
	if err := c.ShouldBindJSON(&profileReq); err != nil {
		Respond(c, http.StatusBadRequest, err, "Invalid", internal.ContentTypeJSON)
		return
	}

	addressUpdate := convertToUpdateAddressParams(profileReq)
	profileUpdate := convertToUpdateProfileParams(profileReq)

	txFunc := func(q *db.Queries) error {
		err := s.Store.Queries.UpdateAddress(c, addressUpdate)
		if err != nil {
			return err
		}
		err = s.Store.Queries.UpdateProfile(c, profileUpdate)
		if err != nil {
			return err
		}
		return nil
	}

	err := s.Store.ExecTx(c, txFunc)
	if err != nil {
		s.Logger.Error(fmt.Sprintf("%v", err.Error()))
		Respond(c, http.StatusInternalServerError, nil, "Something went wrong.", internal.ContentTypeJSON)
		return
	}

	Respond(c, http.StatusCreated, nil, "Success", internal.ContentTypeJSON)

}

func convertToUpdateProfileParams(req api.PutProfileRequest) db.UpdateProfileParams {
	return db.UpdateProfileParams{
		ID:                 int32(req.Id),
		UserID:             internal.Int64ToPGInt4(req.UserId),
		LatestContractID:   internal.PointerInt64ToPGInt4(req.LatestContractId),
		GenderID:           internal.PointerInt64ToPGInt4(req.GenderId),
		DateOfBirth:        internal.TimeToPGTimestamp(req.DateOfBirth),
		Nationality:        req.Nationality,
		MaritalStatusID:    int32(req.MaritalStatusId),
		Dependents:         internal.PointerInt32ToPGInt4(req.Dependents),
		EmergencyContactID: internal.PointerInt64ToPGInt4(req.EmergencyContactId),
		DepartmentID:       internal.PointerInt64ToPGInt4(req.DepartmentId),
	}
}

func convertToUpdateAddressParams(req api.PutProfileRequest) db.UpdateAddressParams {
	return db.UpdateAddressParams{
		ProfileID:    internal.Int64ToPGInt4(req.Id),
		AddressLine1: req.AddressLine1,
		AddressLine2: internal.StringToPGText(req.AddressLine2),
		City:         req.City,
		State:        internal.StringToPGText(req.State),
		PostalCode:   internal.StringToPGText(req.PostalCode),
		Country:      req.Country,
		AddressType:  internal.StringToPGText(req.AddressType),
	}
}
