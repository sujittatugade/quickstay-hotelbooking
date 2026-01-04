import axios from "axios";

export const BASE_URL=import.meta.env.VITE_API_BASE_URL;

const api=axios.create({
baseURL:BASE_URL,
withCredentials:true,
});
api.defaults.headers.common["Accept"] = "application/json";
api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers.put["Content-Type"] = "application/json";
export default api;