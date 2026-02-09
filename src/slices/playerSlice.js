import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songList: [],
  currentIndex: 0,
  isPlaying: false,
  currentListId: null,
  repeatType: "none",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlaylist(state, action) {
      const { songList, startIndex = 0, listId } = action.payload;
      state.songList = songList || [];
      state.currentIndex = startIndex;
      state.isPlaying = true;
      state.currentListId = listId;
    },
    play(state) {
      state.isPlaying = true;
    },
    pause(state) {
      state.isPlaying = false;
    },
    toggle(state) {
      state.isPlaying = !state.isPlaying;
    },
    playAtIndex(state, action) {
      state.currentIndex = action.payload;
      state.isPlaying = true;
    },
    next(state) {
      if (!state.songList.length) return;

      const { currentIndex, songList, repeatType } = state;

      // 🔁 單曲循環
      if (repeatType === "single") {
        state.isPlaying = true;
        return;
      }

      const nextIndex = currentIndex + 1;

      // ▶️ 還在清單內
      if (nextIndex < songList.length) {
        state.currentIndex = nextIndex;
        state.isPlaying = true;
        return;
      }

      // 🔁 清單循環
      if (repeatType === "list") {
        state.currentIndex = 0;
        state.isPlaying = true;
        return;
      }

      // ⛔ none：播完就停
      state.isPlaying = false;
    },
    prev(state) {
      if (!state.songList.length) return;

      const { currentIndex, songList, repeatType } = state;

      // 🔁 單曲循環
      if (repeatType === "single") {
        state.isPlaying = true;
        return;
      }

      const prevIndex = currentIndex - 1;

      // ◀️ 還在清單內
      if (prevIndex >= 0) {
        state.currentIndex = prevIndex;
        state.isPlaying = true;
        return;
      }

      // 🔁 清單循環
      if (repeatType === "list") {
        state.currentIndex = songList.length - 1;
        state.isPlaying = true;
        return;
      }

      // ⛔ none：停在第一首
      state.isPlaying = false;
    },
    cycleRepeat(state) {
      switch (state.repeatType) {
        case "none":
          state.repeatType = "single";
          break;
        case "single":
          state.repeatType = "list";
          break;
        case "list":
          state.repeatType = "none";
          break;
      }
    },
  },
});

export const { setPlaylist, play, pause, toggle, playAtIndex, next, prev, cycleRepeat } =
  playerSlice.actions;

export default playerSlice.reducer;
