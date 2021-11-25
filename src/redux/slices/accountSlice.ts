import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import qs from "qs";
import ax from "axios";

import { AccountState, AuthPayload } from "../../types/accountTypes";
import { RootState } from "../store";
import axios from "../../core/axios";

const initialState: AccountState = {
  loggedIn: false,
  isLoading: false,
  token: null,
  username: null,
};

interface LoginResponseType {
  data: { id: string };
}

export const login = createAsyncThunk<
  { token: string; username: string },
  AuthPayload,
  { state: RootState; rejectValue: any }
>("account/login", async (payload, _thunkAPI) => {
  const response = await axios.post<LoginResponseType>(
    "auth/token/login/",
    qs.stringify({
      username: payload.username,
      password: payload.password,
    })
  );

  return { token: response.data.data.id, username: payload.username };
});

export const logout = createAsyncThunk<
  void,
  void,
  { state: RootState; rejectValue: any }
>("account/logout", async (_payload, { getState, rejectWithValue }) => {
  try {
    const response = await axios.post<any>("auth/token/logout", null, {
      headers: { Authorization: "Token " + getState().account.token },
    });
    return response.data;
  } catch (e: any) {
    if (ax.isAxiosError(e)) {
      if (e.response?.status !== 401) rejectWithValue(e.response?.data);
    }
  }
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
