import axios from 'axios';

export const getAccessToken = () => {
  const accessToken = localStorage.getItem('access_token');
  console.log({ accessToken });

  if (!accessToken) {
    return null;
  }

  return accessToken;
};

export const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'json',
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return axiosInstance;
};
