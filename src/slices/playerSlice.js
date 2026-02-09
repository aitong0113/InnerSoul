import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songList: [],
  currentIndex: 0,
  isPlaying: false,
  currentListId: null,
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
      const nextIndex = state.currentIndex + 1;
      if (nextIndex < state.songList.length) {
        state.currentIndex = nextIndex;
        state.isPlaying = true;
      }
    },
    prev(state) {
      if (!state.songList.length) return;
      const prevIndex = state.currentIndex - 1;
      if (prevIndex >= 0) {
        state.currentIndex = prevIndex;
        state.isPlaying = true;
      }
    },
  },
});

export const { setPlaylist, play, pause, toggle, playAtIndex, next, prev } = playerSlice.actions;

export default playerSlice.reducer;
