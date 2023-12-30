import { GendersApi } from '../axios';
import { gendersApiClient } from './apiClient';

export const useGendersApi = (): GendersApi => {
  return gendersApiClient;
};
