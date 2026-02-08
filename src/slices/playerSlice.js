import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songList: null, // 播放清單（Player 需要）
  startIndex: 0, // 從第幾首開始
  currentIndex: 0,
  currentSong: null, // 目前播放的歌曲物件
  isPlaying: false, // 播放中？
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // 設定播放清單 + 指定起播 index
    setPlaylist(state, action) {
      const { songList, startIndex = 0 } = action.payload;
      state.songList = songList;
      state.startIndex = startIndex;
      state.currentIndex = startIndex;
    },

    setCurrentSong(state, action) {
      state.currentSong = action.payload;
    },

    setCurrentIndex(state, action) {
      state.currentIndex = action.payload;
    },

    play(state) {
      state.isPlaying = true;
    },

    pause(state) {
      state.isPlaying = false;
    },
  },
});

export const { setPlaylist, setCurrentSong, play, pause, setCurrentIndex } = playerSlice.actions;
export default playerSlice.reducer;
