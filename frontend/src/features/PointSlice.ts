import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Proxy";

export const fetchAddPoints = createAsyncThunk(
  "points/fetchAddPoints",
  async (userId: string, { rejectWithValue }) => {
    console.log(userId);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.put(
        `${baseUrl}/api/points/add/${userId}`,
        {},
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

const pointSlice = createSlice({
  name: "points",
  initialState: {
    addPoints: {},
    addPointsStatus: "idle",
    addPointsError: {},
  },
  reducers: {
    resetAddPoints: (state) => {
      state.addPoints = {};
      state.addPointsStatus = "idle";
      state.addPointsError = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddPoints.pending, (state) => {
        state.addPointsStatus = "loading";
      })
      .addCase(fetchAddPoints.fulfilled, (state, action) => {
        state.addPointsStatus = "succeeded";
        state.addPoints = action.payload;
      })
      .addCase(fetchAddPoints.rejected, (state, action) => {
        state.addPointsStatus = "failed";
        state.addPointsError = action.payload || "failed to add points";
      });
  },
});

export default pointSlice.reducer;
