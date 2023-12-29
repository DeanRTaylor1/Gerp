package server

import (
	"net/http"

	"github.com/deanrtaylor1/go-erp-template/api"
	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
)

func (s *Server) GetGenders(c *gin.Context, params api.GetGendersParams) {

	genders, err := s.Store.Queries.GetGenders(c, db.GetGendersParams{
		Offset: int32(*params.Offset),
		Limit:  int32(*params.Limit),
	})
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
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

	Respond(c, http.StatusOK, responseData, "Success", internal.ContentTypeJSON)
}
