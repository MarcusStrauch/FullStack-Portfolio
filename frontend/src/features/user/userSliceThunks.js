import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { logOutCleanUp } from "./userSlice";

export const logIn = createAsyncThunk(
  "user/logIn",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        data: userData,
        withCredentials: true,
        url: `${process.env.REACT_APP_API_ENDPOINT}auth/login`,
      });

      if (response.status === 200 && response.data?.ok) {
        return response.data;
      } else {
        rejectWithValue(response);
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const googleLogIn = createAsyncThunk(
  "user/googleLogIn",
  async (googleJWT, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        data: googleJWT,
        withCredentials: true,
        url: `${process.env.REACT_APP_API_ENDPOINT}auth/google`,
      });

      if (response.status === 200 && response.data?.ok) {
        return response.data;
      } else {
        rejectWithValue(response);
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        data: userData,
        withCredentials: true,
        url: `${process.env.REACT_APP_API_ENDPOINT}auth/signup`,
      });

      if (response.status === 200 && response.data?.ok) {
        return response.data;
      } else {
        rejectWithValue(response);
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authorizeSession = createAsyncThunk(
  "user/authorizeSession",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        withCredentials: true,
        url: `${process.env.REACT_APP_API_ENDPOINT}auth/authorizeSession`,
      });

      if (
        response.status === 200 &&
        "data" in response &&
        response.data.ok &&
        response.data.loggedIn &&
        response.data.user
      ) {
        return response.data;
      } else {
        return rejectWithValue({ ...response.data, status: response.status });
      }
    } catch (err) {
      return rejectWithValue({
        ...err.response.data,
        status: err.response.status,
      });
    }
  }
);

export const logOut = createAsyncThunk(
  "user/logOut",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await dispatch(getCSRFToken());
      const response = await axios({
        method: "DELETE",
        withCredentials: true,
        url: `${process.env.REACT_APP_API_ENDPOINT}auth/logout`,
      });
      if (response.status === 200 && response.data?.ok) {
        dispatch(logOutCleanUp());
        return response.data;
      } else {
        rejectWithValue(response);
      }
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getCSRFToken = createAsyncThunk(
  "user/getCSRFToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        withCredentials: true,
        url: `${process.env.REACT_APP_API_ENDPOINT}auth/getCSRFToken`,
      });
      if (response.status === 200 && response.data?.ok) {
        axios.defaults.headers.post["X-CSRF-Token"] = response.data.token;
        axios.defaults.headers.delete["X-CSRF-Token"] = response.data.token;
        axios.defaults.headers.put["X-CSRF-Token"] = response.data.token;
      } else {
        rejectWithValue(response);
      }
      return response.data.ok;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
