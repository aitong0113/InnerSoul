import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

//抓整張 like table
export const fetchAllLikes = createAsyncThunk("userLike/fetchAllLikes", async () => {
  const res = await api.get("/songLikes");
  return res.data;
});

//toggle like（只改 relation table）
export const toggleSongLike = createAsyncThunk(
  "userLike/toggleSongLike",
  async ({ userId, songId }) => {
    const res = await api.get(`/songLikes?userId=${userId}&songId=${songId}`);

    if (res.data.length) {
      await api.delete(`/songLikes/${res.data[0].id}`);
      return { type: "unlike", id: res.data[0].id };
    } else {
      const newRes = await api.post("/songLikes", {
        userId,
        songId,
      });
      return { type: "like", data: newRes.data };
    }
  }
);

const userLikeSlice = createSlice({
  name: "userLike",
  initialState: {
    likes: [], // 只有 relation table
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLikes.fulfilled, (state, action) => {
        state.likes = action.payload;
      })
      .addCase(toggleSongLike.fulfilled, (state, action) => {
        if (action.payload.type === "like") {
          state.likes.push(action.payload.data);
        } else {
          state.likes = state.likes.filter((l) => l.id !== action.payload.id);
        }
      });
  },
});

export default userLikeSlice.reducer;

//raw table selector
export const selectLikes = (state) => state.userLikes?.likes ?? [];
