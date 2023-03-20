import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:3500",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const responseIntercept = axiosPrivate.interceptors.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
        }
      }
    );
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
