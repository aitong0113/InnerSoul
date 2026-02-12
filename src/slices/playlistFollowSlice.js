import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// 取得使用者追蹤的歌單
export const fetchFollowedPlaylists = createAsyncThunk(
  "playlistFollows/fetchFollowedPlaylists",
  async (userId) => {
    const res = await api.get(`/playlistFollowers?userId=${userId}`);
    return res.data.map((item) => item.playlistId);
  }
);

// 切換追蹤狀態
export const togglePlaylistFollow = createAsyncThunk(
  "playlistFollows/togglePlaylistFollow",
  async ({ userId, playlistId }) => {
    const res = await api.get(`/playlistFollowers?userId=${userId}&playlistId=${playlistId}`);

    if (res.data.length > 0) {
      // 已追蹤 → 取消
      await api.delete(`/playlistFollowers/${res.data[0].id}`);
      return { playlistId, followed: false };
    } else {
      // 未追蹤 → 新增
      await api.post(`/playlistFollowers`, { userId, playlistId });
      return { playlistId, followed: true };
    }
  }
);

const playlistFollowSlice = createSlice({
  name: "playlistFollows",
  initialState: {
    followedPlaylistIds: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowedPlaylists.fulfilled, (state, action) => {
        state.followedPlaylistIds = action.payload;
      })
      .addCase(togglePlaylistFollow.fulfilled, (state, action) => {
        const { playlistId, followed } = action.payload;

        if (followed) {
          if (!state.followedPlaylistIds.includes(playlistId)) {
            state.followedPlaylistIds.push(playlistId);
          }
        } else {
          state.followedPlaylistIds = state.followedPlaylistIds.filter((id) => id !== playlistId);
        }
      });
  },
});

export default playlistFollowSlice.reducer;
