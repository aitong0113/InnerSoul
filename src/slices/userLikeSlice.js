import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import api from "../../src/services/api";

export const selectLikedSongs = (state) => state.userLikes.likedSongs;
export const selectLikedSongIds = createSelector([selectLikedSongs], (likedSongs) =>
  likedSongs.map((like) => like.songId)
);

// 取得喜愛歌曲（照 id 排序，id 越大越新）
export const fetchLikedSongs = createAsyncThunk("userLikes/fetchLikedSongs", async (userId) => {
  const res = await api.get(`/songLikes?userId=${userId}&_sort=id&_order=desc`);
  return res.data;
});

// 切換喜愛
export const toggleSongLike = createAsyncThunk(
  "userLikes/toggleSongLike",
  async ({ userId, songId }) => {
    const res = await api.get(`/songLikes?userId=${userId}&songId=${songId}`);

    if (res.data.length > 0) {
      // 已存在 → 刪除
      await api.delete(`/songLikes/${res.data[0].id}`);
      return { songId, liked: false };
    } else {
      // 不存在 → 新增
      const created = await api.post(`/songLikes`, {
        userId,
        songId,
      });
      return { ...created.data, liked: true };
    }
  }
);

const userLikeSlice = createSlice({
  name: "userLikes",
  initialState: {
    likedSongs: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 取得全部
      .addCase(fetchLikedSongs.fulfilled, (state, action) => {
        state.likedSongs = action.payload;
      })

      // 切換
      .addCase(toggleSongLike.fulfilled, (state, action) => {
        const { liked, songId } = action.payload;

        if (liked) {
          // 新增 → 放最前面（因為是最新）
          state.likedSongs.unshift(action.payload);
        } else {
          // 刪除
          state.likedSongs = state.likedSongs.filter((like) => like.songId !== songId);
        }
      });
  },
});

export default userLikeSlice.reducer;
