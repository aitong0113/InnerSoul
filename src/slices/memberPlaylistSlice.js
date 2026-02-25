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

export const addSongToPlaylist = createAsyncThunk(
  "playlists/addSongToPlaylist",
  async ({ playlistId, song }, { getState, rejectWithValue }) => {
    const state = getState();
    const playlist = state.playlists.playlists.find((pl) => pl.id === playlistId);

    if (!playlist) {
      return rejectWithValue("Playlist not found");
    }

    if (playlist.songsID.includes(song.id)) {
      return rejectWithValue("duplicate");
    }
    const updatedSongsID = [...playlist.songsID, song.id];
    await api.patch(`/lists/${playlistId}`, {
      songsID: updatedSongsID,
    });

    return {
      ...playlist,
      songsID: updatedSongsID,
      songs: [...playlist.songs, song],
    };
  }
);

export const removeSongFromPlaylist = createAsyncThunk(
  "playlists/removeSongFromPlaylist",
  async ({ playlistId, songId }, { getState }) => {
    const state = getState();
    const playlist = state.playlists.playlists.find((pl) => pl.id === playlistId);

    if (!playlist) throw new Error("Playlist not found");

    const updatedSongsID = playlist.songsID.filter((id) => id !== songId);

    await api.patch(`/lists/${playlistId}`, {
      songsID: updatedSongsID,
    });

    return {
      ...playlist,
      songsID: updatedSongsID,
      songs: playlist.songs.filter((s) => s.id !== songId),
    };
  }
);

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
      })
      .addCase(addSongToPlaylist.fulfilled, (state, action) => {
        const index = state.playlists.findIndex((pl) => pl.id === action.payload.id);
        if (index !== -1) {
          state.playlists[index] = action.payload;
        }
      })
      .addCase(removeSongFromPlaylist.fulfilled, (state, action) => {
        const index = state.playlists.findIndex((pl) => pl.id === action.payload.id);
        if (index !== -1) {
          state.playlists[index] = action.payload;
        }
      });
  },
});

export default memberPlaylistSlice.reducer;

/** 基礎 selector（純資料） */
export const selectAllPlaylists = (state) => state.playlists.playlists;
