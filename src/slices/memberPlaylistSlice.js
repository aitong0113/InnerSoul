import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchPlaylists = createAsyncThunk("playlists/fetchPlaylists", async () => {
  const [listRes, songRes, followerRes, likeRes] = await Promise.all([
    api.get("/lists"),
    api.get("/songs"),
    api.get("/playlistFollowers"),
    api.get("/songLikes"),
  ]);

  const lists = listRes.data;
  const songs = songRes.data;
  const followers = followerRes.data;
  const likes = likeRes.data;

  const likeCountMap = new Map();
  likes.forEach((l) => {
    likeCountMap.set(l.songId, (likeCountMap.get(l.songId) || 0) + 1);
  });
  const songMap = new Map(
    songs.map((s) => [
      Number(s.id),
      {
        ...s,
        likeCount: likeCountMap.get(Number(s.id)) || 0,
      },
    ])
  );
  const followerMap = new Map();
  followers.forEach((f) => {
    const playlistId = Number(f.playlistId);
    if (!followerMap.has(playlistId)) {
      followerMap.set(playlistId, []);
    }
    followerMap.get(playlistId).push(f.userId);
  });

  return lists.map((list) => {
    const playlistSongs = (list.songsID || []).map((id) => songMap.get(Number(id))).filter(Boolean);

    return {
      ...list,
      songs: playlistSongs,
      followerUserIds: followerMap.get(list.id) || [],
    };
  });
});

const playlistSlice = createSlice({
  name: "playlists",
  initialState: {
    allPlaylists: [],
    status: "idle",
  },
  reducers: {
    toggleFollow(state, action) {
      const { userId, playlistId } = action.payload;
      const playlist = state.allPlaylists.find((p) => p.id === playlistId);
      if (!playlist) return;

      const index = playlist.followerUserIds.indexOf(userId);

      if (index > -1) {
        playlist.followerUserIds.splice(index, 1);
      } else {
        playlist.followerUserIds.push(userId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.allPlaylists = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchPlaylists.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default playlistSlice.reducer;
export const { toggleFollow } = playlistSlice.actions;
