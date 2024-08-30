import axiosInstance from "@/config/axios.config";
import { AUTH_BASE_URI } from "@/endpoints/endpoints";

/**
 * Login Api
 * @param username String
 * @param password String
 * @returns Promise<AxiosResponse>
 */
const loginApi = (username: string, password: string) => {
  return axiosInstance.post(AUTH_BASE_URI.login, { username, password });
};

export { loginApi };
