import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/**
 * 抓整張 follower table
 */
export const fetchAllFollowers = createAsyncThunk("playlistFollow/fetchAllFollowers", async () => {
  const res = await api.get("/playlistFollowers");
  return res.data;
});

/**
 * toggle follow（只改 relation）
 */
export const togglePlaylistFollow = createAsyncThunk(
  "playlistFollow/togglePlaylistFollow",
  async ({ userId, playlistId }) => {
    const res = await api.get(`/playlistFollowers?userId=${userId}&playlistId=${playlistId}`);

    if (res.data.length) {
      await api.delete(`/playlistFollowers/${res.data[0].id}`);
      return { type: "unfollow", id: res.data[0].id };
    } else {
      const newRes = await api.post("/playlistFollowers", {
        userId,
        playlistId,
      });
      return { type: "follow", data: newRes.data };
    }
  }
);

const playlistFollowSlice = createSlice({
  name: "playlistFollow",
  initialState: {
    followers: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
      })
      .addCase(togglePlaylistFollow.fulfilled, (state, action) => {
        if (action.payload.type === "follow") {
          state.followers.push(action.payload.data);
        } else {
          state.followers = state.followers.filter((f) => f.id !== action.payload.id);
        }
      });
  },
});

export default playlistFollowSlice.reducer;

/** 原始 follower table */
export const selectFollowers = (state) => state.playlistFollow.followers;
