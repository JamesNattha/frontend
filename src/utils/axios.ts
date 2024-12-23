import axios, { AxiosInstance, AxiosResponse } from "axios";
import config from "../../config";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true, // Ensure cookies are sent with requests
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Ensure response data is handled correctly
    if (typeof response.data === "string" && response.data.startsWith("{")) {
      try {
        response.data = JSON.parse(response.data);
      } catch (e) {
        console.error("Error parsing JSON response:", e);
      }
    }
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
