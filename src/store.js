import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./slices/playerSlice";
import userLikeReducer from "./slices/userLikeSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    userLikes: userLikeReducer,
  },
});
