package server

import (
	"fmt"
	"net/http"
	"strings"

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

	err := s.ProfileService.UpdateProfile(c, user, profileReq)
	if err != nil {
		fmt.Println(err.Error())
		if strings.HasPrefix(err.Error(), "invalid") {
			Respond(c, http.StatusBadRequest, nil, err.Error(), internal.ContentTypeJSON)
			return
		}
		Respond(c, http.StatusInternalServerError, nil, "Something went wrong", internal.ContentTypeJSON)
		return
	}

	Respond(c, http.StatusCreated, nil, "Success", internal.ContentTypeJSON)

}
