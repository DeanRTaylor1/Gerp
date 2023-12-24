import { UserManagementApi } from "../axios";
import { userManagementApiClient } from "./apiClient";

export const useUserApi = (): UserManagementApi => {
  return userManagementApiClient;
};
