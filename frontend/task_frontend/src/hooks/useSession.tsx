import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearSession, setUser } from "@/store/sessionSlice";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { axiosPrivate } from "./axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useSession = () => {
  const dispatch = useAppDispatch();
  const {  loading, initialized } = useAppSelector(
    (state) => state.session
  );

  const fetchSession = useCallback(async () => {
    try {
      const res = await axiosPrivate.get("api/users/me", {
        withCredentials: true, // to include cookies
      });

      const data = res.data;
      dispatch(setUser(data));
      return data;
    } catch (err) {
      console.error("Failed to fetch user", err);

      if (axios.isAxiosError(err)) {
        console.error("Axios error response:", err.response?.data.error);
      }

      dispatch(clearSession());
      return null;
    }
  }, [dispatch]);

  useEffect(() => {
    if (!initialized) {
      fetchSession();
    }
  }, [fetchSession, initialized]);

  return { loading, fetchSession };
};

// Add a logout function that can be used anywhere in the app
export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      // Call your logout API endpoint
      const res = await axiosPrivate.post("api/users/logout", null, {
        withCredentials: true,
      });      

      if (res.data) {
        setTimeout(() => {
          // Clear the user from Redux
          dispatch(clearSession());
          toast.success("Logged out successfully!");
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return { logout };
};
