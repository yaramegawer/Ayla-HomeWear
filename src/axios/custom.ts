import axios from "axios";
import { tokenManager } from "../utils/tokenManager";

const customFetch = axios.create({
    baseURL: "https://el-mawardy-store.vercel.app/",
    headers: {
        Accept: "application/json"
    }
})

// Add request interceptor to include JWT token
customFetch.interceptors.request.use(
    (config) => {
        const token = tokenManager.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token expiration
customFetch.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid, clear auth data
            tokenManager.clearAuth();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default customFetch;