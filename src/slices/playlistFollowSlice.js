import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// 取得使用者追蹤的歌單
export const fetchFollowedPlaylists = createAsyncThunk(
  "playlistFollows/fetchFollowedPlaylists",
  async (userId) => {
    const res = await api.get(`/playlistFollowers?userId=${userId}`);
    return res.data;
  }
);

// 切換追蹤狀態
export const togglePlaylistFollow = createAsyncThunk(
  "playlistFollows/togglePlaylistFollow",
  async ({ userId, playlistId }) => {
    const res = await api.get(`/playlistFollowers?userId=${userId}&playlistId=${playlistId}`);

    if (res.data.length > 0) {
      await api.delete(`/playlistFollowers/${res.data[0].id}`);
      return {
        playlistId,
        followed: false,
        followerId: res.data[0].id,
      };
    } else {
      const newRes = await api.post(`/playlistFollowers`, {
        userId,
        playlistId,
      });

      return {
        playlistId,
        followed: true,
        followerData: newRes.data,
      };
    }
  }
);

const playlistFollowSlice = createSlice({
  name: "playlistFollow",
  initialState: {
    followedPlaylistsRaw: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowedPlaylists.fulfilled, (state, action) => {
        state.followedPlaylistsRaw = action.payload;
      })
      .addCase(togglePlaylistFollow.fulfilled, (state, action) => {
        const { followed, followerId, followerData } = action.payload;

        if (followed) {
          state.followedPlaylistsRaw.push(followerData);
        } else {
          state.followedPlaylistsRaw = state.followedPlaylistsRaw.filter(
            (f) => f.id !== followerId
          );
        }
      });
  },
});

export default playlistFollowSlice.reducer;

// 取得 raw 資料
export const selectFollowedPlaylistsRaw = (state) => state.playlistFollow.followedPlaylistsRaw;

// 轉換成 playlistId 陣列
export const selectFollowedPlaylistIds = (state) =>
  state.playlistFollow.followedPlaylistsRaw.map((f) => f.playlistId);
