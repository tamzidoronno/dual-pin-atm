import axios, { type AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;