import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || "http://localhost:4000",
  withCredentials: true, // important for cookies
});

export default api;
