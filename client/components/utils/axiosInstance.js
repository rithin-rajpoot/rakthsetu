import axios from "axios";

// Fetch environment variables from Vite configuration
const DB_URL = import.meta.env.VITE_DB_URL;

export const axiosInstance = axios.create({
  baseURL : DB_URL,
  withCredentials : true,
  headers: {
    "Content-Type": "application/json",
  }, 
});
