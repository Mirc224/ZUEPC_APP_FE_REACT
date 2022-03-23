import { axiosPrivateClient } from "../utils/axios-utils";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivateClient.interceptors.request.use(
            config => {
                if (config.headers && !config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth.token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );
      
        const responseIntercept = axiosPrivateClient.interceptors.response.use(
          response => response,
          async (error) => {
              const prevRequest = error?.config;
              if (error?.response?.status === 401 && !prevRequest?.sent) {
                prevRequest.sent = true;
                const newAccessToken = await refresh();
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosPrivateClient(prevRequest);
              }
              return Promise.reject(error);
          }
        );
        
        return () => {
            axiosPrivateClient.interceptors.response.eject(requestIntercept);
            axiosPrivateClient.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])
    

    return axiosPrivateClient;
}

export default useAxiosPrivate;