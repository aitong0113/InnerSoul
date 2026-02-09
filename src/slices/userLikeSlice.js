import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../src/services/api";

// 取得喜愛歌曲
export const fetchLikedSongs = createAsyncThunk("userLikes/fetchLikedSongs", async (userId) => {
  const res = await api.get(`/songLikes?userId=${userId}`);
  return res.data.map((item) => item.songId);
});

// 切換喜愛
export const toggleSongLike = createAsyncThunk(
  "userLikes/toggleSongLike",
  async ({ userId, songId }) => {
    const res = await api.get(`/songLikes?userId=${userId}&songId=${songId}`);

    if (res.data.length > 0) {
      await api.delete(`/songLikes/${res.data[0].id}`);
      return { songId, liked: false };
    } else {
      await api.post(`/songLikes`, { userId, songId });
      return { songId, liked: true };
    }
  }
);

const userLikeSlice = createSlice({
  name: "userLikes",
  initialState: {
    likedSongIds: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikedSongs.fulfilled, (state, action) => {
        state.likedSongIds = action.payload;
      })
      .addCase(toggleSongLike.fulfilled, (state, action) => {
        const { songId, liked } = action.payload;

        if (liked) {
          if (!state.likedSongIds.includes(songId)) {
            state.likedSongIds.push(songId);
          }
        } else {
          state.likedSongIds = state.likedSongIds.filter((id) => id !== songId);
        }
      });
  },
});

export default userLikeSlice.reducer;
