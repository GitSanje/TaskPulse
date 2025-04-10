import { axiosPrivate } from "./axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {

  const refresh = useRefreshToken();

  useEffect(() => {


    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        config.withCredentials = true;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // 403 -> forbidden, potentially due to an expired access token
        if (error?.response?.status === 403 && !prevRequest?.sent || error?.response?.status === 401) {
            if (prevRequest?.sent) return Promise.reject(error);
            prevRequest.sent = true;
            try {
                const result = await refresh(); // Refresh the token (if needed)
                if (result?.status) {
                  // Retry the original request after refresh
                  return axiosPrivate(prevRequest);
                }
              } catch (err) {
                // Handle any refresh errors here (e.g., log out the user)
                console.error("Failed to refresh the token", err);
              }
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
 
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh]);
};


export default useAxiosPrivate