import axiosInstance from "@/lib/axiosConfig";
/**
 * Login Api
 * @param username String
 * @param password String
 * @returns Promise<AxiosResponse>
 */
const loginUser = (username: string, password: string) => {
  return axiosInstance.post("/auth/login", { username, password });
};

export { loginUser };
