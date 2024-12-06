import axios from "axios";
import { baseURL } from "../config";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
