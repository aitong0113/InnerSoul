import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/** 抓播放清單內容 **/
export const fetchPlaylists = createAsyncThunk("playlists/fetchPlaylists", async () => {
  const [listsRes, songsRes] = await Promise.all([api.get("/lists"), api.get("/songs")]);

  const lists = listsRes.data;
  const songs = songsRes.data;

  // 把 song 掛回 playlist（純內容組裝）
  const songMap = new Map(songs.map((s) => [s.id, s]));

  const playlists = lists.map((list) => ({
    ...list,
    songs: list.songsID.map((id) => songMap.get(id)).filter(Boolean),
  }));

  return playlists;
});

const memberPlaylistSlice = createSlice({
  name: "playlists",
  initialState: {
    playlists: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.playlists = action.payload;
        state.status = "succeeded";
      });
  },
});

export default memberPlaylistSlice.reducer;

/** 基礎 selector（純資料） */
export const selectAllPlaylists = (state) => state.playlists.playlists;
