import { DefaultApi } from "../axios";
import apiClient from "./apiClient";

export const useApi = (): DefaultApi => {
  return apiClient;
};
