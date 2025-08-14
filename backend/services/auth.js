import axios from "./api"; 

export const registerUser = (userData) => axios.post("/api/auth/register", userData);
export const loginUser = (userData) => axios.post("/api/auth/login", userData, { withCredentials: true });
