import axios, { AxiosInstance } from "axios";
import { baseURL } from "../config";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
