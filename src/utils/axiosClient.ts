import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios, { HttpStatusCode } from "axios";

interface AxiosRequestWithRetry extends AxiosRequestConfig {
  _retry: boolean;
}

export const axiosClient = () => {
  const headers = {
    "Content-Type": "application/json",
    "Access-control-Allow-Origin": "*",
  };

  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (res: AxiosResponse): AxiosResponse => {
      return res;
    },

    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestWithRetry;

      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (error.response?.status === HttpStatusCode.Unauthorized) {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log(error);

        if (!refreshToken) {
          localStorage.clear();
          window.location.href = "/";
        }
        console.log(document);

        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
            {},
            {
              headers: { Authorization: `Bearer ${refreshToken}` },
            }
          );

          localStorage.setItem("accessToken", data.data.accessToken);
          // localStorage.setItem("refreshToken", data.data.refreshToken);
          console.log(data.cookie);
          data.cookie("refreshToken", data.data.refreshToken, { httponly: true });
        } catch {
          localStorage.clear();
          window.location.href = "/";
        }

        //document.cookie = `refreshToken= ${data.data.refreshToken}; expires=Thu, 18 Dec 2013 12:00:00 UTC`

        return api(originalRequest);
      }
      window.location.href = "/page-erreur";
    }
  );

  return api;
};
