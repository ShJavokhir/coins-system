import axios from "axios";
import Message from "../utils/Message";

// export const API_URL = "http://178.159.39.206:3000";
// export const API_URL = "http://271-243-245.local:8085";
// export const API_URL = "http://188.225.31.181:8085";
export const API_URL = "http://90.156.227.199";
// export const API_URL = "http://192.168.1.6:3001";

const client = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

client.interceptors.request.use((config) => {
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  return config;
})
client.interceptors.response.use((config) => {
  return config;
}, (error) => {
  if (error?.response?.status === 401) {
    Message.unauthorizedError();
    localStorage.removeItem("token");
    return Promise.reject(error);
  }
  return Promise.reject(error);
})

export default client;
