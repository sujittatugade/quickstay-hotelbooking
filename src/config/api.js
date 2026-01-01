import axios from "axios";

export const BASE_URL="http://localhost:8080";

const api=axios.create({
baseURL:BASE_URL,
withCredentials:true,
});
api.defaults.headers.common["Accept"] = "application/json";
api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers.put["Content-Type"] = "application/json";
export default api;