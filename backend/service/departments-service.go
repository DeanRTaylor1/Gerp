package service

import (
	"fmt"

	"github.com/deanrtaylor1/go-erp-template/api"
	db "github.com/deanrtaylor1/go-erp-template/db/sqlc"
	"github.com/deanrtaylor1/go-erp-template/internal"
	"github.com/gin-gonic/gin"
)

type DepartmentService interface {
	GetDepartments(ctx *gin.Context, params api.GetDepartmentsParams) ([]api.DepartmentsResponse, error)
	CreateDepartment(ctx *gin.Context, body api.PostDepartmentsJSONRequestBody) (*api.DepartmentsResponse, error)
}

type departmentServiceImpl struct {
	logger *internal.Logger
	store  *db.SQLStore
}

func NewDepartmentService(logger *internal.Logger, store *db.SQLStore) DepartmentService {
	return &departmentServiceImpl{
		logger: logger,
		store:  store,
	}
}

func (s *departmentServiceImpl) GetDepartments(ctx *gin.Context, params api.GetDepartmentsParams) ([]api.DepartmentsResponse, error) {
	departmentsRows, err := s.store.GetAllDepartments(ctx, db.GetAllDepartmentsParams{
		Offset: int32(*params.Offset),
		Limit:  int32(*params.Limit),
	})
	if err != nil {
		s.logger.Error(fmt.Sprintf("error getting all users, error: %v", err.Error()))
		return nil, err
	}

	departments := make([]api.DepartmentsResponse, len(departmentsRows))
	for i, v := range departmentsRows {
		id := int64(v.ID)
		departmentName := v.DepartmentName

		department := api.DepartmentsResponse{
			Id:             &id,
			DepartmentName: &departmentName,
		}
		departments[i] = department
	}

	return departments, nil
}

func (s *departmentServiceImpl) CreateDepartment(ctx *gin.Context, body api.PostDepartmentsJSONRequestBody) (*api.DepartmentsResponse, error) {
	departmentRow, err := s.store.CreateDepartment(ctx, body.DepartmentName)
	if err != nil {
		s.logger.Error((fmt.Sprintf("error creating department error: %v", err.Error())))

		return nil, err
	}

	deptId := int64(departmentRow.ID)
	department := &api.DepartmentsResponse{
		Id:             &deptId,
		DepartmentName: &departmentRow.DepartmentName,
	}

	return department, nil
}
