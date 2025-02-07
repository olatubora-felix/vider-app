// lib/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `/api`, // Set your base URL
  withCredentials: true, // Include credentials (cookies)
});
export default axiosInstance;
