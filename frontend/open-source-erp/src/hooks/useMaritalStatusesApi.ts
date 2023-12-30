import { MaritalStatusesApi } from '../axios';
import { maritalStatusesApiClient } from './apiClient';

export const useMaritalStatusesApi = (): MaritalStatusesApi => {
  return maritalStatusesApiClient;
};
