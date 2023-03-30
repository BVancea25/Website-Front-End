import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:3500",
  withCredentials: true,
});

export default authApi;
