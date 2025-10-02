"use client"
import { UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, 
  UPDATE_USER_FAIL, USER_ENTRY_REQUEST, 
  USER_ENTRY_SUCCESS, USER_ENTRY_FAIL } 
  from "../constants/userConstants";

import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";


export const userLoginEntry = ({ clerkId, email, firstName, lastName }) => async (dispatch) => {
  try {
    dispatch({ type: USER_ENTRY_REQUEST });


    const { data } = await axiosInstance.post(`/users`, { clerkId, email, firstName, lastName });


    dispatch({ type: USER_ENTRY_SUCCESS, payload: data });

    toast.success("User Added to Database successfully!");

  } catch (error) {

    dispatch({
      type: USER_ENTRY_FAIL,
      payload: error.response.data.message,
    });

    toast.error(error.response.data.message || "User not added to database");
  }
}



export const updateUser = (userData, clerkId) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });


    const { data } = await axiosInstance.patch(`/users`, {
      clerkId,
      data: userData
    });


    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });

    toast.success("Profile Updated successfully!");

  } catch (error) {

    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });

    toast.error(error.response.data.message || "Profile not updated");
  }
}

