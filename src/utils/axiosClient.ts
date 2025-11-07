import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios, { HttpStatusCode } from "axios";
import Cookies from "js-cookie";

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
    withCredentials: true,
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
        const refreshToken = Cookies.get("refreshToken");

        if (!refreshToken && originalRequest.url == "/auth/refresh-token") {
          localStorage.clear();
          window.location.href = "/";
        }

        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
            {},
            { withCredentials: true, headers: { Authorization: refreshToken } }
          );

          localStorage.setItem("accessToken", data.data.accessToken);
        } catch {
          localStorage.clear();
          window.location.href = "/";
        }

        return api(originalRequest);
      }
      window.location.href = "/page-erreur";
    }
  );

  return api;
};
