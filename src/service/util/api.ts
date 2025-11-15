import { ApiOptions, apiRequest } from "./api-request";

export const api = {
  get: <T>(url: string, options?: ApiOptions) =>
    apiRequest<T>("GET", url, options),
  post: <T>(url: string, body?: any, options?: ApiOptions) =>
    apiRequest<T>("POST", url, { ...options, body }),
  put: <T>(url: string, body?: any, options?: ApiOptions) =>
    apiRequest<T>("PUT", url, { ...options, body }),
  patch: <T>(url: string, body?: any, options?: ApiOptions) =>
    apiRequest<T>("PATCH", url, { ...options, body }),
  delete: <T>(url: string, body?: any, options?: ApiOptions) =>
    apiRequest<T>("DELETE", url, { ...options, body }),
};
