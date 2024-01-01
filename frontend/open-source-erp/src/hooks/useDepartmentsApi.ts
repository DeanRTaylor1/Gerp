import { DepartmentsApi } from '../axios';
import { departmentsApiClient } from './apiClient';

export const useDepartmentsApi = (): DepartmentsApi => {
  return departmentsApiClient;
};
