import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/sessionSlice";
import { UserPayload } from "@/types";
import axios from "axios";
import { useCallback, useEffect } from "react";

export const useSession = () => {
  
  const dispatch = useAppDispatch()
  const { user, loading, initialized } = useAppSelector((state) => state.session)

  const fetchSession = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3500/api/users/me", {
        withCredentials: true, // to include cookies
      });

      const data: UserPayload = res.data;
      dispatch(setUser(data));
      return data;
    } catch (err) {
      console.error("Failed to fetch user", err);

      if (axios.isAxiosError(err)) {
        console.error("Axios error response:", err.response?.data.error);
      }

      dispatch(setUser(null));
      return null;
    }
  }, [dispatch]);

  
  useEffect(() => {
    if (!initialized) {
      fetchSession();
    }
  }, [fetchSession, initialized]);
    return { user, loading ,fetchSession};

}

// Add a logout function that can be used anywhere in the app
export const useLogout = () => {
  const dispatch = useAppDispatch()

  const logout = async () => {
    try {
      // Call your logout API endpoint
      const res = await fetch("http://localhost:3500/api/users/logout", {
        method: "POST",
        credentials: "include",
      })

      if (res.ok) {
        // Clear the user from Redux
        dispatch(setUser(null))
      }
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  return { logout }
}
