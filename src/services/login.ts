import axiosInstance from "@/lib/axiosConfig";

const loginUser = (username: string, password: string) => {
  return axiosInstance.post("/auth/login", { username, password });
};

export { loginUser };
