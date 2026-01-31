import { createSlice } from "@reduxjs/toolkit";
import { authorizeSession, googleLogIn, logIn, logOut } from "./userSliceThunks";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    logInStatus: {
      pending: false,
      loggedIn: false,
      failed: false,
    },
    logOutStatus: {
      pending: false,
      success: false,
      failed: false,
    },
    authStatus: {
      pending: false,
      success: false,
      failed: false,
    },
  },
  reducers: {
    logOutCleanUp: (state, action) => {
      state.logInStatus = {
        pending: false,
        success: false,
        failed: false,
      };
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ----------LOG IN---------- */
      .addCase(logIn.pending, (state, action) => {
        state.logInStatus.pending = true;
        state.logInStatus.failed = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.logInStatus.pending = false;
        state.logInStatus.failed = false;
        state.user = action.payload.user;
        state.logInStatus.loggedIn = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        if (action.payload) {
          if (action.payload.message) {
            state.logInStatus.message = action.payload.message;
          }
        }
        state.logInStatus.pending = false;
        state.logInStatus.failed = true;
      })
      /* ----------LOG IN---------- */

      /* ----------GOOGLE LOG IN---------- */
      .addCase(googleLogIn.pending, (state, action) => {
        state.logInStatus.pending = true;
        state.logInStatus.failed = false;
      })
      .addCase(googleLogIn.fulfilled, (state, action) => {
        state.logInStatus.pending = false;
        state.logInStatus.failed = false;
        state.user = action.payload.user;
        state.logInStatus.loggedIn = true;
      })
      .addCase(googleLogIn.rejected, (state, action) => {
        if (action.payload) {
          if (action.payload.message) {
            state.logInStatus.message = action.payload.message;
          }
        }
        state.logInStatus.pending = false;
        state.logInStatus.failed = true;
      })
      /* ----------GOOGLE LOG IN---------- */

      /* ----------LOG OUT---------- */
      .addCase(logOut.pending, (state, action) => {
        state.logOutStatus.pending = true;
        state.logOutStatus.success = false;
        state.logOutStatus.failed = false;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.logOutStatus.pending = false;
        state.logOutStatus.success = true;
        state.logOutStatus.failed = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.logOutStatus.pending = false;
        state.logOutStatus.success = false;
        state.logOutStatus.failed = true;
      })
      /* ----------LOG OUT---------- */

      /* ----------CHECK SESSION---------- */
      .addCase(authorizeSession.pending, (state, action) => {
        state.authStatus.pending = true;
        state.authStatus.success = false;
        state.authStatus.failed = false;
      })
      .addCase(authorizeSession.fulfilled, (state, action) => {
        state.authStatus.pending = false;
        state.authStatus.success = true;
        state.authStatus.failed = false;
        state.user = action.payload.user;
        state.logInStatus.loggedIn = action.payload.loggedIn;
      })
      .addCase(authorizeSession.rejected, (state, action) => {
        state.authStatus.pending = false;
        state.authStatus.success = false;
        state.authStatus.failed = true;
      });
    /* ----------CHECK SESSION---------- */
  },
});

export const selectLogInStatus = (state) => state.user.logInStatus;
export const selectAuthStatus = (state) => state.user.authStatus;
export const selectUser = (state) => state.user.user;

export const { logOutCleanUp } = userSlice.actions;

export default userSlice.reducer;
