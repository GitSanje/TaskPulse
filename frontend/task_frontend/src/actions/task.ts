"use server";

import { axiosPrivate } from "@/hooks/axios";


import { taskFormData } from "@/types";
import axios from "axios";


export const addTask = async (data: taskFormData) => {
  try {


    const response = await axiosPrivate.post("/api/tasks/create_task", data, {
      withCredentials: true,
    });

    if (response.data.status) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {


    if (axios.isAxiosError(error)) {
      //400 Bad Request - The server couldn't process the request due to invalid syntax or bad data.
      if (error.response?.status === 401) {
        return {
          success: false,
          message: error.response.data.message,
        };
      } else {
        // Handle other errors (e.g., network issues, server errors)
        return {
          success: false,
          message: "An error occurred while adding task. Please try again later.",
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


export const getUserTasks = async (id:number) => {
  try {
    const response = await axiosPrivate.get(`/api/tasks/user/${id}`, {
      withCredentials: true,
    });

    if (response.data.status) {
      return {
        success: true,
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: "No tasks found",
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      //400 Bad Request - The server couldn't process the request due to invalid syntax or bad data.
      if (error.response?.status === 401) {
        return {
          success: false,
          message: error.response.data.message,
        };
      } else {
        // Handle other errors (e.g., network issues, server errors)
        return {
          success: false,
          message: "An error occurred while adding task. Please try again later.",
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


export const deleteTask = async (id: number) => {
  try {
    const response = await axiosPrivate.delete(`/api/tasks/${id}`, {
      withCredentials: true,
    });

    if (response.data.status) {
      return { success: true, message: response.data.message };
    }

    return { success: false, message: "Failed to delete task." };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Delete failed.",
      };
    }
    return { success: false, message: "Unexpected error occurred." };
  }
};



export const editTask = async (task: taskFormData) => {
  try {
    const response = await axiosPrivate.post(`/api/tasks/edit`, task, {
      withCredentials: true,
    });

    if (response.data.status) {
      return { success: true, message: response.data.message };
    }

    return { success: false, message: "Failed to edit task." };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Edit failed.",
      };
    }
    return { success: false, message: "Unexpected error occurred." };
  }
};