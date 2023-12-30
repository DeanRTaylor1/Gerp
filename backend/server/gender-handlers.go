package server

import (
	"net/http"

	"github.com/deanrtaylor1/go-erp-template/api"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
)

func (s *Server) GetGenders(c *gin.Context, params api.GetGendersParams) {

	responseData, err := s.GendersService.GetGenders(c, params)
	if err != nil {
		Respond(c, http.StatusInternalServerError, nil, "Something went wrong.", internal.ContentTypeJSON)
	}

	Respond(c, http.StatusOK, responseData, "Success", internal.ContentTypeJSON)
}
