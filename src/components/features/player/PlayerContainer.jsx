import { useDispatch, useSelector } from "react-redux";
import Player from "./Player";
import { setCurrentSong, play, pause, setCurrentIndex } from "../../../slices/playerSlice";

function PlayerContainer() {
  const dispatch = useDispatch();

  const { songList, startIndex, currentSong, isPlaying, currentIndex } = useSelector(
    (state) => state.player
  );

  // 沒有播放清單時，不顯示 Player
  if (songList === null) return null;

  return (
    <Player
      songList={songList}
      startIndex={startIndex}
      currentSong={currentSong}
      currentIndex={currentIndex}
      isPlaying={isPlaying}
      setCurrentSong={(song) => dispatch(setCurrentSong(song))}
      setIsPlaying={(val) => dispatch(val ? play() : pause())}
      setCurrentIndex={(i) => dispatch(setCurrentIndex(i))}
    />
  );
}

export default PlayerContainer;
