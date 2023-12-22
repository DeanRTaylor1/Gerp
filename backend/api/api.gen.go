// Package api provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen/v2 version v2.0.0 DO NOT EDIT.
package api

import (
	"bytes"
	"compress/gzip"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"path"
	"strings"
	"time"

	"github.com/getkin/kin-openapi/openapi3"
	"github.com/gin-gonic/gin"
	"github.com/oapi-codegen/runtime"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

// Defines values for UserRequestRole.
const (
	UserRequestRoleAdmin   UserRequestRole = "admin"
	UserRequestRoleManager UserRequestRole = "manager"
	UserRequestRoleUser    UserRequestRole = "user"
)

// Defines values for UserRequestStatus.
const (
	UserRequestStatusActive   UserRequestStatus = "active"
	UserRequestStatusInactive UserRequestStatus = "inactive"
)

// Defines values for UserResponseRole.
const (
	UserResponseRoleAdmin   UserResponseRole = "admin"
	UserResponseRoleManager UserResponseRole = "manager"
	UserResponseRoleUser    UserResponseRole = "user"
)

// Defines values for UserResponseStatus.
const (
	UserResponseStatusActive   UserResponseStatus = "active"
	UserResponseStatusInactive UserResponseStatus = "inactive"
)

// AccessTokenResponse defines model for AccessTokenResponse.
type AccessTokenResponse struct {
	AccessToken string `json:"access_token"`
}

// ApiResponse defines model for ApiResponse.
type ApiResponse struct {
	Data    *ApiResponse_Data `json:"data"`
	Message *string           `json:"message,omitempty"`
	Status  *int32            `json:"status,omitempty"`
}

// ApiResponseData0 defines model for .
type ApiResponseData0 = map[string]interface{}

// ApiResponseData1 defines model for .
type ApiResponseData1 = []map[string]interface{}

// ApiResponse_Data defines model for ApiResponse.Data.
type ApiResponse_Data struct {
	union json.RawMessage
}

// ErrorResponse defines model for ErrorResponse.
type ErrorResponse struct {
	Code    *int32  `json:"code,omitempty"`
	Message *string `json:"message,omitempty"`
}

// LoginUserRequest defines model for LoginUserRequest.
type LoginUserRequest struct {
	Email    string `json:"email" validate:"email"`
	Password string `json:"password" validate:"min=8,matches=^[a-zA-Z0-9]*$"`
}

// LoginUserResponse defines model for LoginUserResponse.
type LoginUserResponse struct {
	Data    *map[string]interface{} `json:"data,omitempty"`
	Message *string                 `json:"message,omitempty"`
	Status  *int                    `json:"status,omitempty"`
}

// MultiUsersResponse defines model for MultiUsersResponse.
type MultiUsersResponse struct {
	Data    *[]UserResponse `json:"data,omitempty"`
	Message *string         `json:"message,omitempty"`
	Status  *int            `json:"status,omitempty"`
}

// SingleUserResponse defines model for SingleUserResponse.
type SingleUserResponse struct {
	Data    *UserResponse `json:"data,omitempty"`
	Message *string       `json:"message,omitempty"`
	Status  *int          `json:"status,omitempty"`
}

// UserRequest defines model for UserRequest.
type UserRequest struct {
	CreatedAt *time.Time          `json:"createdAt,omitempty"`
	Email     openapi_types.Email `json:"email" validate:"email"`
	FirstName *string             `json:"firstName,omitempty" validate:"string"`
	Id        *int64              `json:"id,omitempty"`
	LastName  *string             `json:"lastName,omitempty" validate:"string"`
	Password  string              `json:"password" validate:"string"`
	Role      *UserRequestRole    `json:"role,omitempty"`
	Status    UserRequestStatus   `json:"status" validate:"oneOf=active,inactive"`
	UpdatedAt *time.Time          `json:"updatedAt,omitempty"`
	Username  string              `json:"username" validate:"string"`
}

// UserRequestRole defines model for UserRequest.Role.
type UserRequestRole string

// UserRequestStatus defines model for UserRequest.Status.
type UserRequestStatus string

// UserResponse defines model for UserResponse.
type UserResponse struct {
	CreatedAt *time.Time           `json:"createdAt,omitempty"`
	Email     *openapi_types.Email `json:"email,omitempty"`
	FirstName *string              `json:"firstName,omitempty"`
	Id        *int64               `json:"id,omitempty"`
	LastName  *string              `json:"lastName,omitempty"`
	Role      *UserResponseRole    `json:"role,omitempty"`
	Status    *UserResponseStatus  `json:"status,omitempty"`
	UpdatedAt *time.Time           `json:"updatedAt,omitempty"`
	Username  *string              `json:"username,omitempty"`
}

// UserResponseRole defines model for UserResponse.Role.
type UserResponseRole string

// UserResponseStatus defines model for UserResponse.Status.
type UserResponseStatus string

// GetUsersParams defines parameters for GetUsers.
type GetUsersParams struct {
	// Offset Page number of the users list
	Offset *int `form:"offset,omitempty" json:"offset,omitempty"`

	// Limit Number of users per page
	Limit *int `form:"limit,omitempty" json:"limit,omitempty"`
}

// PostAuthJSONRequestBody defines body for PostAuth for application/json ContentType.
type PostAuthJSONRequestBody = LoginUserRequest

// PostUsersJSONRequestBody defines body for PostUsers for application/json ContentType.
type PostUsersJSONRequestBody = UserRequest

// PutUsersUserIdJSONRequestBody defines body for PutUsersUserId for application/json ContentType.
type PutUsersUserIdJSONRequestBody = UserRequest

// AsApiResponseData0 returns the union data inside the ApiResponse_Data as a ApiResponseData0
func (t ApiResponse_Data) AsApiResponseData0() (ApiResponseData0, error) {
	var body ApiResponseData0
	err := json.Unmarshal(t.union, &body)
	return body, err
}

// FromApiResponseData0 overwrites any union data inside the ApiResponse_Data as the provided ApiResponseData0
func (t *ApiResponse_Data) FromApiResponseData0(v ApiResponseData0) error {
	b, err := json.Marshal(v)
	t.union = b
	return err
}

// MergeApiResponseData0 performs a merge with any union data inside the ApiResponse_Data, using the provided ApiResponseData0
func (t *ApiResponse_Data) MergeApiResponseData0(v ApiResponseData0) error {
	b, err := json.Marshal(v)
	if err != nil {
		return err
	}

	merged, err := runtime.JsonMerge(t.union, b)
	t.union = merged
	return err
}

// AsApiResponseData1 returns the union data inside the ApiResponse_Data as a ApiResponseData1
func (t ApiResponse_Data) AsApiResponseData1() (ApiResponseData1, error) {
	var body ApiResponseData1
	err := json.Unmarshal(t.union, &body)
	return body, err
}

// FromApiResponseData1 overwrites any union data inside the ApiResponse_Data as the provided ApiResponseData1
func (t *ApiResponse_Data) FromApiResponseData1(v ApiResponseData1) error {
	b, err := json.Marshal(v)
	t.union = b
	return err
}

// MergeApiResponseData1 performs a merge with any union data inside the ApiResponse_Data, using the provided ApiResponseData1
func (t *ApiResponse_Data) MergeApiResponseData1(v ApiResponseData1) error {
	b, err := json.Marshal(v)
	if err != nil {
		return err
	}

	merged, err := runtime.JsonMerge(t.union, b)
	t.union = merged
	return err
}

func (t ApiResponse_Data) MarshalJSON() ([]byte, error) {
	b, err := t.union.MarshalJSON()
	return b, err
}

func (t *ApiResponse_Data) UnmarshalJSON(b []byte) error {
	err := t.union.UnmarshalJSON(b)
	return err
}

// ServerInterface represents all server handlers.
type ServerInterface interface {
	// Get auth token
	// (POST /auth)
	PostAuth(c *gin.Context)
	// Get a list of users
	// (GET /users)
	GetUsers(c *gin.Context, params GetUsersParams)
	// Create a new user
	// (POST /users)
	PostUsers(c *gin.Context)
	// Delete a user
	// (DELETE /users/{userId})
	DeleteUsersUserId(c *gin.Context, userId int)
	// Get a user by ID
	// (GET /users/{userId})
	GetUsersUserId(c *gin.Context, userId int)
	// Update a user
	// (PUT /users/{userId})
	PutUsersUserId(c *gin.Context, userId int)
}

// ServerInterfaceWrapper converts contexts to parameters.
type ServerInterfaceWrapper struct {
	Handler            ServerInterface
	HandlerMiddlewares []MiddlewareFunc
	ErrorHandler       func(*gin.Context, error, int)
}

type MiddlewareFunc func(c *gin.Context)

// PostAuth operation middleware
func (siw *ServerInterfaceWrapper) PostAuth(c *gin.Context) {

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PostAuth(c)
}

// GetUsers operation middleware
func (siw *ServerInterfaceWrapper) GetUsers(c *gin.Context) {

	var err error

	// Parameter object where we will unmarshal all parameters from the context
	var params GetUsersParams

	// ------------- Optional query parameter "offset" -------------

	err = runtime.BindQueryParameter("form", true, false, "offset", c.Request.URL.Query(), &params.Offset)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter offset: %w", err), http.StatusBadRequest)
		return
	}

	// ------------- Optional query parameter "limit" -------------

	err = runtime.BindQueryParameter("form", true, false, "limit", c.Request.URL.Query(), &params.Limit)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter limit: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetUsers(c, params)
}

// PostUsers operation middleware
func (siw *ServerInterfaceWrapper) PostUsers(c *gin.Context) {

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PostUsers(c)
}

// DeleteUsersUserId operation middleware
func (siw *ServerInterfaceWrapper) DeleteUsersUserId(c *gin.Context) {

	var err error

	// ------------- Path parameter "userId" -------------
	var userId int

	err = runtime.BindStyledParameter("simple", false, "userId", c.Param("userId"), &userId)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter userId: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.DeleteUsersUserId(c, userId)
}

// GetUsersUserId operation middleware
func (siw *ServerInterfaceWrapper) GetUsersUserId(c *gin.Context) {

	var err error

	// ------------- Path parameter "userId" -------------
	var userId int

	err = runtime.BindStyledParameter("simple", false, "userId", c.Param("userId"), &userId)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter userId: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetUsersUserId(c, userId)
}

// PutUsersUserId operation middleware
func (siw *ServerInterfaceWrapper) PutUsersUserId(c *gin.Context) {

	var err error

	// ------------- Path parameter "userId" -------------
	var userId int

	err = runtime.BindStyledParameter("simple", false, "userId", c.Param("userId"), &userId)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter userId: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PutUsersUserId(c, userId)
}

// GinServerOptions provides options for the Gin server.
type GinServerOptions struct {
	BaseURL      string
	Middlewares  []MiddlewareFunc
	ErrorHandler func(*gin.Context, error, int)
}

// RegisterHandlers creates http.Handler with routing matching OpenAPI spec.
func RegisterHandlers(router gin.IRouter, si ServerInterface) {
	RegisterHandlersWithOptions(router, si, GinServerOptions{})
}

// RegisterHandlersWithOptions creates http.Handler with additional options
func RegisterHandlersWithOptions(router gin.IRouter, si ServerInterface, options GinServerOptions) {
	errorHandler := options.ErrorHandler
	if errorHandler == nil {
		errorHandler = func(c *gin.Context, err error, statusCode int) {
			c.JSON(statusCode, gin.H{"msg": err.Error()})
		}
	}

	wrapper := ServerInterfaceWrapper{
		Handler:            si,
		HandlerMiddlewares: options.Middlewares,
		ErrorHandler:       errorHandler,
	}

	router.POST(options.BaseURL+"/auth", wrapper.PostAuth)
	router.GET(options.BaseURL+"/users", wrapper.GetUsers)
	router.POST(options.BaseURL+"/users", wrapper.PostUsers)
	router.DELETE(options.BaseURL+"/users/:userId", wrapper.DeleteUsersUserId)
	router.GET(options.BaseURL+"/users/:userId", wrapper.GetUsersUserId)
	router.PUT(options.BaseURL+"/users/:userId", wrapper.PutUsersUserId)
}

// Base64 encoded, gzipped, json marshaled Swagger object
var swaggerSpec = []string{

	"H4sIAAAAAAAC/8xYbW/bNhD+K8StnwbZVtpgyAQEmLcWRYAtDdJlHxZ4AyOdbaYSqZAnN17g/z7w5FeJ",
	"dpzVSfalVqXTvTz3PMdTHiA1RWk0anKQPIBLx1hIvuynKTr3u/mC+hJdabRDf7u0pkRLCtlIstHf5K38",
	"/2laIiTgyCo9gtksAot3lbKYQXK9aT2IFtbm5hZTglkE/VJtj5VJkv5XV3kub3KEhGyFERiNn4aQXD+0",
	"/D2AIizcWmKrUPMb0lo5hdlgFkGBzskRBsqIwJGkih0NjS0kQQJK07u3sHSkNOEILdfcCvbBWmO3V5aa",
	"DPfyvSvJUNxfzUjpK4f2Eu8qdNQOjYVUOV/cy6L0oMKtGeuuKxSNf+Kn3dQUq1zm4SK47xhZqo7PfYS6",
	"g/dkZYfkiN1OZK4ySf6FOoJPr5TOfTU2aye/v7dC6dOTqJCUjtGd/nUtO//0O3/GnR8H37+BWZNwdey1",
	"yIPdID1GvSWd3lgcQgLf9Vby6c210wsJJ9Sc/fi2D71+q3JSvgJ3oBI20GiJ5ZCpf1Z6lON+6D8l48Nl",
	"uFM+qUVJmPVpQ76eqx1SBbZkM4u2Ka4tuKW7BYu/XYFDZR2dywLb8b/B/9oEUllzjv1wHJxjuQwlwiAc",
	"JpP1YfMY0gcIZ01e16Krgo+6rFAe08qhhQgKqaWvfBDtouPy5ZTUxJNH6fnl4L8nycfjae0nWjr0OVdl",
	"9lTy+nJ0kD+M6tEhwGzM8GXIqD3Ol+ANtgp365n7esp9ohCfS1avwNoXIl1gjvNw0kPD5wm61KqSlNGQ",
	"+J1T1KeIGBorPlxeiBuZfkGddb1jRRztU4lafDaVTZFN+hdnEMEErau9xN24e+STNSVqWSpI4F037sbM",
	"VhozUD1Z0ZiZaOqzxPNR+jTOMkjgwjjqV9woW583P5tsWu+HmlDzK7Isc5XyS71bZ/RqaX/shGztgg2l",
	"+WWab9SK4YzfxkfPEX9xTPsENpvBW5P4pdYm99FVRSHtFBL4iCQ8gqL+fvAPe54anOkIA4h+ROKtiJtg",
	"ZYHE1tdNClzIEQpdFTdohRkKGqNgxyJXjpjQkMBdhXYKEdRMBDMcOvQPV9VnOJRVTpDEoa+CZtDzZbw6",
	"VolWlH5lCcfLVaG2hDsKxRu0WhkfrJWBfTPQyz7Dtyww1M2mRbRDGotOPoc2XlEWgQU4gOU5fmWMRLqQ",
	"RgTHB+zo5gdqIIE/6oNaGS3YttHNWrFCCj1PdE2evQf/c5bNatLmSNju8Hu+zz2+Yuu2ZlkVfpiuRFEt",
	"TDf7ta6SPYRxfDAY1/9+EQDRVyZqBJrDra5fyDl40e6B9uIQxS/M975wbLfiUnNysBpupuLsPY+NKjQ1",
	"qpdD638wk+IXpfF8j2v05orvLmnMD9FOwsduhhNRWb8f+38TGBOVSa+Xm1TmY+MoOYlP4p4sVW9yBLPB",
	"7N8AAAD//27nQWStFAAA",
}

// GetSwagger returns the content of the embedded swagger specification file
// or error if failed to decode
func decodeSpec() ([]byte, error) {
	zipped, err := base64.StdEncoding.DecodeString(strings.Join(swaggerSpec, ""))
	if err != nil {
		return nil, fmt.Errorf("error base64 decoding spec: %w", err)
	}
	zr, err := gzip.NewReader(bytes.NewReader(zipped))
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %w", err)
	}
	var buf bytes.Buffer
	_, err = buf.ReadFrom(zr)
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %w", err)
	}

	return buf.Bytes(), nil
}

var rawSpec = decodeSpecCached()

// a naive cached of a decoded swagger spec
func decodeSpecCached() func() ([]byte, error) {
	data, err := decodeSpec()
	return func() ([]byte, error) {
		return data, err
	}
}

// Constructs a synthetic filesystem for resolving external references when loading openapi specifications.
func PathToRawSpec(pathToFile string) map[string]func() ([]byte, error) {
	res := make(map[string]func() ([]byte, error))
	if len(pathToFile) > 0 {
		res[pathToFile] = rawSpec
	}

	return res
}

// GetSwagger returns the Swagger specification corresponding to the generated code
// in this file. The external references of Swagger specification are resolved.
// The logic of resolving external references is tightly connected to "import-mapping" feature.
// Externally referenced files must be embedded in the corresponding golang packages.
// Urls can be supported but this task was out of the scope.
func GetSwagger() (swagger *openapi3.T, err error) {
	resolvePath := PathToRawSpec("")

	loader := openapi3.NewLoader()
	loader.IsExternalRefsAllowed = true
	loader.ReadFromURIFunc = func(loader *openapi3.Loader, url *url.URL) ([]byte, error) {
		pathToFile := url.String()
		pathToFile = path.Clean(pathToFile)
		getSpec, ok := resolvePath[pathToFile]
		if !ok {
			err1 := fmt.Errorf("path not found: %s", pathToFile)
			return nil, err1
		}
		return getSpec()
	}
	var specData []byte
	specData, err = rawSpec()
	if err != nil {
		return
	}
	swagger, err = loader.LoadFromData(specData)
	if err != nil {
		return
	}
	return
}
