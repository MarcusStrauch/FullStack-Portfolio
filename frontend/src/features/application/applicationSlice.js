import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    options: null,
    snackbarStatus: {
      open: false,
      message: "",
      type: "info",
    },
  },
  reducers: {
    setSnackbarStatus: (state, action) => {
      state.snackbarStatus = {
        open: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    resetSnackbarStatus: (state) => {
      state.snackbarStatus = {
        open: false,
        message: "",
      };
    },
  },
});

export const selectSnackbarStatus = (state) => state.application.snackbarStatus;

export const { setSnackbarStatus, resetSnackbarStatus } = applicationSlice.actions;

export default applicationSlice.reducer;
