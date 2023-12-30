import { ProfilesApi } from '../axios';
import { profilesApiClient } from './apiClient';

export const useProfilesApi = (): ProfilesApi => {
  return profilesApiClient;
};
