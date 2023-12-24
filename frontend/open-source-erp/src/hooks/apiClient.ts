import { AuthenticationApi, UserManagementApi } from "../axios";
import { Configuration } from "../axios/configuration";

const config = new Configuration({ basePath: "http://localhost:8080/api/v1" });
const authenticationApiClient = new AuthenticationApi(config);
const userManagementApiClient = new UserManagementApi(config);

export { authenticationApiClient, userManagementApiClient };
