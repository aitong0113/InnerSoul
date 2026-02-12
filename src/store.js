import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./slices/playerSlice";
import userLikeReducer from "./slices/userLikeSlice";
import playlistFollowReducer from "./slices/playlistFollowSlice.js";
import memberPlaylistReducer from "./slices/memberPlaylistSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    userLikes: userLikeReducer,
    playlistFollow: playlistFollowReducer,
    playlists: memberPlaylistReducer,
  },
});
