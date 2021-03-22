import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import qs from "qs";

import { AccountState, AuthPayload } from "../../types/accountTypes";
import { RootState } from "../store";
import axios from "../../core/axios";
import history from "../../core/history";

const initialState: AccountState = {
  loggedIn: false,
  isLoading: false,
  token: null,
  username: null,
};

export const login = createAsyncThunk<
  { token: string; username: string },
  AuthPayload,
  { state: RootState; rejectValue: any }
>("account/login", async (payload, _thunkAPI) => {
  const response = await axios.post(
    "auth/token/login/",
    qs.stringify({
      username: payload.username,
      password: payload.password,
    })
  );

  history.push("/");
  return { token: response.data.data.id, username: payload.username };
});

export const logout = createAsyncThunk<
  void,
  void,
  { state: RootState; rejectValue: any }
>("account/logout", async (_payload, { getState }) => {
  const response = await axios.post("auth/token/logout", null, {
    headers: { Authorization: "Token " + getState().account.token },
  });

  history.push("/");
  return response.data;
});

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, username } = action.payload;
        state.loggedIn = true;
        state.token = token;
        state.username = username;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loggedIn = false;
        state.token = null;
        state.username = null;
        state.isLoading = false;
      });
  },
});

const { reducer } = accountSlice;

export default reducer;
