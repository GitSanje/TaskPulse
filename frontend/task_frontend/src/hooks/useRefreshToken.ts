import  { axiosPrivate } from "./axios";
import axios from 'axios';
const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const response = await axiosPrivate.get("/api/users/refresh", {
        withCredentials: true,
      });


      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error response:", err.response?.data.error);
      } else {
        console.error("Unexpected error:", err);
      }
      // Rethrowing error or handle it accordingly
      throw err;
    }
  };

  return refresh;
};

export default useRefreshToken;