import { UserManagementApi, UserResponse } from '../axios';

export const getFetchUser = (
  usersApi: UserManagementApi,
  userId: number
): (() => Promise<UserResponse | null>) => {
  return async () => {
    const response = await usersApi.usersUserIdGet(userId);
    return response.data.data || null;
  };
};
