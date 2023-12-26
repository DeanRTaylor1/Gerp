import { AuthenticationApi, UserManagementApi } from "../axios";
import { Configuration } from "../axios/configuration";
import { createAxiosInstance } from "../utils/auth";

const customAxiosInstance = createAxiosInstance();
const config = new Configuration({
  basePath: "http://localhost:8080/api/v1",
  baseOptions: {
    axios: customAxiosInstance,
  },
});
const authenticationApiClient = new AuthenticationApi(config);
const userManagementApiClient = new UserManagementApi(config);

export { authenticationApiClient, userManagementApiClient };
