import axios from "./axiosInstance";

export const loginUser = (credentials) => axios.post("/auth/login", credentials);
export const registerUser = (formData) => axios.post("/auth/register", formData);
