import { AuthenticationApi } from "../axios";
import { authenticationApiClient } from "./apiClient";

export const useAuthApi = (): AuthenticationApi => {
  return authenticationApiClient;
};
