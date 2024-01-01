package server

import (
	"net/http"

	"github.com/deanrtaylor1/go-erp-template/api"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
)

func (s *Server) GetDepartments(c *gin.Context, params api.GetDepartmentsParams) {
	departments, err := s.DepartmentsService.GetDepartments(c, params)
	if err != nil {
		Respond(c, http.StatusInternalServerError, nil, "Something went wrong", internal.ContentTypeJSON)
		return
	}
	Respond(c, http.StatusAccepted, departments, "Success", internal.ContentTypeJSON)
}

func (s *Server) PostDepartments(c *gin.Context) {
	var body api.PostDepartmentsJSONRequestBody
	if err := c.ShouldBindJSON(&body); err != nil {
		Respond(c, http.StatusBadRequest, nil, "Bad request", internal.ContentTypeJSON)
		return
	}
	department, err := s.DepartmentsService.CreateDepartment(c, body)
	if err != nil {

		Respond(c, http.StatusInternalServerError, nil, "Something went wrong.", internal.ContentTypeJSON)
	}
	Respond(c, http.StatusAccepted, department, "Success", internal.ContentTypeJSON)
}
