import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songList: null, // 播放清單（Player 需要）
  startIndex: 0, // 從第幾首開始
  currentSong: null, // 目前播放的歌曲物件
  isPlaying: false, // 播放中？
  playTrigger: 0, // 先保留：用來對齊你原本的 useEffect([playTrigger])
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // 設定播放清單 + 指定起播 index，並觸發 Player 的 playTrigger
    setPlaylist(state, action) {
      const { songList, startIndex = 0 } = action.payload;
      state.songList = songList;
      state.startIndex = startIndex;
      state.playTrigger += 1;
    },

    setCurrentSong(state, action) {
      state.currentSong = action.payload;
    },

    play(state) {
      state.isPlaying = true;
    },

    pause(state) {
      state.isPlaying = false;
    },
  },
});

export const { setPlaylist, setCurrentSong, play, pause } = playerSlice.actions;
export default playerSlice.reducer;
