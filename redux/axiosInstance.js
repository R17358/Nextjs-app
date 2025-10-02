import axios from "axios";

// Create a reusable Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api", // default API base
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add a request interceptor to attach auth token
axiosInstance.interceptors.request.use(
  async (config) => {
    // Example: get token from localStorage or from Clerk session
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor for logging or error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
