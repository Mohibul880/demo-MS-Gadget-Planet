// ==============================
// API Service for Storefront
// ==============================
import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:5000/api" });
export default api;
