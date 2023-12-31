package internal

import (
	"fmt"
	"strconv"
	"time"

	"github.com/deanrtaylor1/go-erp-template/api"
	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/jackc/pgx/v5/pgtype"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

func Int64ToPGInt4(value int64) pgtype.Int4 {
	if value == 0 {
		return pgtype.Int4{Valid: false}
	}
	return pgtype.Int4{Int32: int32(value), Valid: true}
}

func Int32ToPGInt4(value int32) pgtype.Int4 {
	if value == 0 {
		return pgtype.Int4{Valid: false}
	}
	return pgtype.Int4{Int32: value, Valid: true}
}

func StringToPGText(str *string) pgtype.Text {
	if str == nil {
		return pgtype.Text{Valid: false}
	}
	return pgtype.Text{String: *str, Valid: true}
}

func TimeToPGTimestamp(t time.Time) pgtype.Timestamp {
	if t.IsZero() {
		return pgtype.Timestamp{Valid: false}
	}
	return pgtype.Timestamp{Time: t, Valid: true}
}

func PointerInt64ToPGInt4(i *int64) pgtype.Int4 {
	if i == nil {
		return pgtype.Int4{Valid: false}
	}
	return pgtype.Int4{Int32: int32(*i), Valid: true}
}

func PointerInt32ToPGInt4(i *int32) pgtype.Int4 {
	if i == nil {
		return pgtype.Int4{Valid: false}
	}
	return pgtype.Int4{Int32: *i, Valid: true}
}

func ConvertToUpdateProfileParams(req api.PutProfileRequest) db.UpdateProfileParams {
	return db.UpdateProfileParams{
		ID:                 int32(req.Id),
		UserID:             Int64ToPGInt4(req.UserId),
		LatestContractID:   PointerInt64ToPGInt4(req.LatestContractId),
		GenderID:           PointerInt64ToPGInt4(req.GenderId),
		DateOfBirth:        TimeToPGTimestamp(req.DateOfBirth),
		Nationality:        req.Nationality,
		MaritalStatusID:    int32(req.MaritalStatusId),
		Dependents:         PointerInt32ToPGInt4(req.Dependents),
		EmergencyContactID: PointerInt64ToPGInt4(req.EmergencyContactId),
		DepartmentID:       PointerInt64ToPGInt4(req.DepartmentId),
	}
}

func ConvertToCreateProfileParams(req api.PutProfileRequest) db.CreateProfileParams {
	return db.CreateProfileParams{
		UserID:             Int64ToPGInt4(req.UserId),
		LatestContractID:   PointerInt64ToPGInt4(req.LatestContractId),
		GenderID:           PointerInt64ToPGInt4(req.GenderId),
		DateOfBirth:        TimeToPGTimestamp(req.DateOfBirth),
		Nationality:        req.Nationality,
		MaritalStatusID:    int32(req.MaritalStatusId),
		Dependents:         PointerInt32ToPGInt4(req.Dependents),
		EmergencyContactID: PointerInt64ToPGInt4(req.EmergencyContactId),
		DepartmentID:       PointerInt64ToPGInt4(req.DepartmentId),
	}
}

func ConvertToUpdateAddressParams(req api.PutProfileRequest) db.UpdateAddressParams {
	return db.UpdateAddressParams{
		ProfileID:    Int64ToPGInt4(req.Id),
		AddressLine1: req.AddressLine1,
		AddressLine2: StringToPGText(req.AddressLine2),
		City:         req.City,
		State:        StringToPGText(req.State),
		PostalCode:   StringToPGText(req.PostalCode),
		Country:      req.Country,
		AddressType:  StringToPGText(req.AddressType),
	}
}

func ConvertProfileRequestToCreateAddressParams(req api.PutProfileRequest) db.CreateAddressParams {
	fmt.Println(req.Id)
	return db.CreateAddressParams{
		ProfileID:    Int64ToPGInt4(req.Id),
		AddressLine1: req.AddressLine1,
		AddressLine2: StringToPGText(req.AddressLine2),
		City:         req.City,
		State:        StringToPGText(req.State),
		PostalCode:   StringToPGText(req.PostalCode),
		Country:      req.Country,
		AddressType:  StringToPGText(req.AddressType),
	}
}

func ptrInt64(v int32) *int64 {
	r := int64(v)
	return &r
}

func ptrString(v string) *string { return &v }

func GetUserRowToUserResponse(dbUser db.GetUserRow) *api.UserResponse {
	return &api.UserResponse{
		Id:                      ptrInt64(int32(dbUser.ID)),
		Username:                ptrString(dbUser.Username),
		FirstName:               ptrString(dbUser.FirstName),
		LastName:                ptrString(dbUser.LastName),
		Email:                   (*openapi_types.Email)(ptrString(dbUser.Email)),
		Avatar:                  ptrStringFromPGText(dbUser.Avatar),
		Role:                    ptrString(dbUser.RoleName),
		Status:                  ptrString(dbUser.StatusName),
		CreatedAt:               ptrTimeFromPGTimestamp(dbUser.CreatedAt),
		UpdatedAt:               ptrTimeFromPGTimestamp(dbUser.UpdatedAt),
		DateOfBirth:             ptrTimeFromPGTimestamp(dbUser.DateOfBirth),
		Nationality:             ptrStringFromPGText(dbUser.Nationality),
		Dependents:              PtrInt32FromPGInt4(dbUser.Dependents),
		EmergencyContactName:    ptrStringFromPGText(dbUser.EmergencyContactName),
		EmergencyContactNumber:  ptrInt32FromString(dbUser.EmergencyContactNumber.String),
		EmergencyContactAddress: ptrStringFromPGText(dbUser.EmergencyContactAddress),
		DepartmentName:          ptrStringFromPGText(dbUser.DepartmentName),
		Gender:                  ptrStringFromPGText(dbUser.Gender),
		MaritalStatus:           ptrStringFromPGText(dbUser.MaritalStatus),
		AddressLine1:            ptrStringFromPGText(dbUser.AddressLine1),
		AddressLine2:            ptrStringFromPGText(dbUser.AddressLine2),
		City:                    ptrStringFromPGText(dbUser.City),
		State:                   ptrStringFromPGText(dbUser.ResidenceState),
		Country:                 ptrStringFromPGText(dbUser.Country),
		PostalCode:              ptrStringFromPGText(dbUser.PostalCode),
		ProfileId:               ptrInt64(dbUser.ProfileID.Int32),
	}
}

// Helper functions to handle pgtype conversions
func ptrStringFromPGText(text pgtype.Text) *string {
	if !text.Valid {
		return nil
	}
	return &text.String
}

func ptrTimeFromPGTimestamp(timestamp pgtype.Timestamp) *time.Time {
	if !timestamp.Valid {
		return nil
	}
	t := timestamp.Time
	return &t
}

func PtrInt32FromPGInt4(int4 pgtype.Int4) *int32 {
	if !int4.Valid {
		return nil
	}
	i := int4.Int32
	return &i
}

func ptrInt32FromString(str string) *int32 {
	if str == "" {
		return nil
	}
	i, err := strconv.Atoi(str)
	if err != nil {
		return nil
	}
	int32Val := int32(i)
	return &int32Val
}

func ToUserResponse(user db.User, userStatus string, userRole string) *api.UserResponse {
	var createdAt, updatedAt *time.Time
	var firstName, lastName *string
	var email openapi_types.Email
	userId := int64(user.ID)

	username := user.Username
	if user.CreatedAt.Valid {
		createdAt = &user.CreatedAt.Time
	}
	if user.UpdatedAt.Valid {
		updatedAt = &user.UpdatedAt.Time
	}

	email = openapi_types.Email(user.Email)

	return &api.UserResponse{
		Id:        &userId,
		Username:  &username,
		FirstName: firstName,
		Avatar:    &user.Avatar.String,
		LastName:  lastName,
		Email:     &email,
		Role:      &userRole,
		Status:    &userStatus,
		CreatedAt: createdAt,
		UpdatedAt: updatedAt,
	}
}

func ToLoginUserResponse(accesToken string) *api.AccessTokenResponse {
	return &api.AccessTokenResponse{
		AccessToken: accesToken,
	}
}
