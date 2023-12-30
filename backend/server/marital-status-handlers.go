package server

import (
	"net/http"

	"github.com/deanrtaylor1/go-erp-template/api"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
)

func (s *Server) GetMaritalStatuses(c *gin.Context, params api.GetMaritalStatusesParams) {
	maritalStatuses, err := s.MaritalStatusesService.GetMaritalStatuses(c, params)
	if err != nil {
		Respond(c, http.StatusInternalServerError, nil, "Something went wrong.", internal.ContentTypeJSON)
		return
	}
	Respond(c, http.StatusOK, maritalStatuses, "Success", internal.ContentTypeJSON)
}
