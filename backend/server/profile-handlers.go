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

	userObj, exists := c.Get("user")
	if !exists {
		Respond(c, http.StatusBadRequest, nil, "Unauthorized", internal.ContentTypeJSON)
		return
	}

	user, ok := userObj.(db.GetUserByEmailRow)
	if !ok {
		Respond(c, http.StatusBadRequest, nil, "Unauthorized: User type assertion failed", internal.ContentTypeJSON)
		return
	}

	var profileReq api.PutProfilesJSONRequestBody
	if err := c.ShouldBindJSON(&profileReq); err != nil {
		Respond(c, http.StatusBadRequest, err, "Invalid", internal.ContentTypeJSON)
		return
	}

	if user.ID != int32(profileReq.UserId) && user.RoleName != "Administrator" {
		s.Logger.Error(fmt.Sprintf("Update Rejected: Current User: %d Trying to update User: %d. Current USers Role: %s", user.ID, profileReq.UserId, user.RoleName))
		Respond(c, http.StatusUnauthorized, nil, "Unauthorized", internal.ContentTypeJSON)
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
