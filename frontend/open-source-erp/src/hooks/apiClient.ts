import {
  AuthenticationApi,
  DepartmentsApi,
  GendersApi,
  MaritalStatusesApi,
  ProfilesApi,
  UserManagementApi,
} from '../axios';
import { Configuration } from '../axios/configuration';
import { createAxiosInstance } from '../utils/auth';

const customAxiosInstance = createAxiosInstance();
const config = new Configuration({
  basePath: 'http://localhost:8080/api/v1',
});

const authenticationApiClient = new AuthenticationApi(
  config,
  undefined,
  customAxiosInstance
);

const userManagementApiClient = new UserManagementApi(
  config,
  undefined,
  customAxiosInstance
);

const gendersApiClient = new GendersApi(config, undefined, customAxiosInstance);

const profilesApiClient = new ProfilesApi(
  config,
  undefined,
  customAxiosInstance
);

const maritalStatusesApiClient = new MaritalStatusesApi(
  config,
  undefined,
  customAxiosInstance
);

const departmentsApiClient = new DepartmentsApi(
  config,
  undefined,
  customAxiosInstance
);

export {
  authenticationApiClient,
  userManagementApiClient,
  gendersApiClient,
  profilesApiClient,
  maritalStatusesApiClient,
  departmentsApiClient,
};
