import { useDispatch, useSelector } from "react-redux";
import Player from "./Player";
import { setCurrentSong, play, pause } from "../../../slices/playerSlice";

function PlayerContainer() {
  const dispatch = useDispatch();

  const { songList, startIndex, currentSong, isPlaying, playTrigger } = useSelector(
    (state) => state.player
  );

  // 沒有播放清單時，不顯示 Player
  if (songList === null) return null;

  return (
    <Player
      songList={songList}
      startIndex={startIndex}
      currentSong={currentSong}
      isPlaying={isPlaying}
      playTrigger={playTrigger}
      setCurrentSong={(song) => dispatch(setCurrentSong(song))}
      setIsPlaying={(val) => dispatch(val ? play() : pause())}
    />
  );
}

export default PlayerContainer;
