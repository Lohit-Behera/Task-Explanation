import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Proxy";

export const fetchCreateUser = createAsyncThunk(
  "user/fetchCreateUser",
  async (user: { name: string; avatar: object }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post(
        `${baseUrl}/api/users/create`,
        user,
        config
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(`${baseUrl}/api/users/all`, config);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    createUser: {},
    createUserStatus: "idle",
    createUserError: {},

    allUsers: [],
    allUsersStatus: "idle",
    allUsersError: {},
  },
  reducers: {
    resetCreateUser: (state) => {
      state.createUser = {};
      state.createUserStatus = "idle";
      state.createUserError = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateUser.pending, (state) => {
        state.createUserStatus = "loading";
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.createUserStatus = "succeeded";
        state.createUser = action.payload;
      })
      .addCase(fetchCreateUser.rejected, (state, action) => {
        state.createUserStatus = "failed";
        state.createUserError = action.payload || "create user failed";
      })

      .addCase(fetchAllUsers.pending, (state) => {
        state.allUsersStatus = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsersStatus = "succeeded";
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.allUsersStatus = "failed";
        state.allUsersError = action.payload || "fetch all users failed";
      });
  },
});

export const { resetCreateUser } = userSlice.actions;
export default userSlice.reducer;
