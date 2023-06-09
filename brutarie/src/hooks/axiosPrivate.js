import axiosPrivate from "../api/axiosPrivateInstance";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          //daca headerul nu exista stim ca este prima incercare si atasam tokenul primit la logare
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`; //adaugam antetul Authorization deoarece nu exista inca
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config; //requestul anterior
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          //daca statusul de eroare este 403 adica Forbiden, vom da refresh la token o singura data
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          console.log(newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; //atasam noul access token la requestul anterior
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept); //functie de cleanup pentru interceptor
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
