"use server";

import { SignupFormData, SignInFormData } from "@/types";
import axios from "axios";
import {axios2}  from "@/hooks/axios";
export const signup = async (data: SignupFormData) => {
  try {
    const { first_name, last_name, email, password } = data;
    const response = await axios2.post(
      "api/users/create_user",
      {
        first_name,
        last_name,
        email,
        password,
      }
    );

    if (response.data.status) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Check if error response is a 409 Conflict (email already exists)
      if (error.response?.status === 409) {
        return {
          success: false,
          message:
            error.response.data.message || "This email is already taken!",
        };
      } else {
        // Handle other errors (e.g., network issues, server errors)
        return {
          success: false,
          message:
            "An error occurred while signing up. Please try again later.",
        };
      }
    } else {
      // Non-Axios error handling
      return {
        success: false,
        message: "An unexpected error occurred.",
      };
    }
  }
};

export const signIn = async (data: SignInFormData) => {
  try {
    const { email, password } = data;
    const response = await axios2.post(
      "api/users/login",
      {
        email,
        password,
      },
      { withCredentials: true } // Necessary to receive cookies
    );

    if (response.data.status) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // If the error status code is 401 (Unauthorized), return the error message
      if (error.response?.status === 401) {
        return {
          success: false,
          message: error.response.data.message,
        };
      } else {
        // Handle other errors (e.g., network issues, server errors)
        return {
          success: false,
          message: "An error occurred while log in. Please try again later.",
        };
      }
    } else {
      // Non-Axios error handling
      return {
        success: false,
        message: "An unexpected error occurred.",
      };
    }
  }
};
