import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/*取得所有播放清單（含歌曲與追蹤者）*/
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

  /* 計算歌曲按讚數 */
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

  /* 建立 follower 關聯表 */
  const followerMap = new Map();
  followers.forEach((f) => {
    const playlistId = Number(f.playlistId);
    if (!followerMap.has(playlistId)) {
      followerMap.set(playlistId, []);
    }
    followerMap.get(playlistId).push(f.userId);
  });

  /* 組合最終資料 */
  return lists.map((list) => {
    const playlistSongs = (list.songsID || []).map((id) => songMap.get(Number(id))).filter(Boolean);

    return {
      ...list,
      songs: playlistSongs,
      followerUserIds: followerMap.get(list.id) || [],
    };
  });
});

//切換追蹤狀態（同步後端）
export const toggleFollowAsync = createAsyncThunk(
  "playlists/toggleFollowAsync",
  async ({ userId, playlistId }, { getState }) => {
    const state = getState();
    const playlist = state.playlists.allPlaylists.find((p) => p.id === playlistId);

    const isFollowed = playlist?.followerUserIds.includes(userId);

    if (isFollowed) {
      const res = await api.get(`/playlistFollowers?userId=${userId}&playlistId=${playlistId}`);

      if (res.data.length > 0) {
        await api.delete(`/playlistFollowers/${res.data[0].id}`);
      }

      return { userId, playlistId, followed: false };
    } else {
      await api.post("/playlistFollowers", {
        userId,
        playlistId,
      });

      return { userId, playlistId, followed: true };
    }
  }
);

//Slice
const playlistSlice = createSlice({
  name: "playlists",
  initialState: {
    allPlaylists: [],
    status: "idle",
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      /* 取得播放清單 */
      .addCase(fetchPlaylists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.allPlaylists = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchPlaylists.rejected, (state) => {
        state.status = "failed";
      })

      /* 切換追蹤 */
      .addCase(toggleFollowAsync.fulfilled, (state, action) => {
        const { userId, playlistId, followed } = action.payload;

        const playlist = state.allPlaylists.find((p) => p.id === playlistId);
        if (!playlist) return;

        if (followed) {
          if (!playlist.followerUserIds.includes(userId)) {
            playlist.followerUserIds.push(userId);
          }
        } else {
          playlist.followerUserIds = playlist.followerUserIds.filter((id) => id !== userId);
        }
      });
  },
});

export default playlistSlice.reducer;
