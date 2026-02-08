import { useEffect, useState, useRef, useCallback } from "react";
import { authStore } from "../../../services/auth/authStore";

import "./player.css";
import {
  IconVolume2,
  IconVolumeOff,
  IconVolume,
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconList,
  IconRepeat,
  IconRepeatOnce,
  IconRepeatOff,
  IconPlayerSkipBackFilled,
  IconPlayerSkipForwardFilled,
  IconHeartFilled,
  IconHeart,
  IconChevronDown,
} from "@tabler/icons-react";

function Player({
  songList,
  startIndex,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  playTrigger,
}) {
  // 訂閱方案
  const plan = authStore.getUserPlan();
  const isPro = plan === "pro";
  const FREE_PLAY_LIMIT = 3;

  // 播放器狀態
  const [playerType, setPlayerType] = useState("none");
  const playerRef = useRef(null);

  //音檔位置
  const audioRef = useRef(null);
  // 清單中的第幾首
  const [currentIndex, setCurrentIndex] = useState(0);
  // 收藏功能
  const favorite = () => {
    if (currentSong.liked) {
      // 記得用{}，不然會報錯
      setCurrentSong({ ...currentSong, liked: false });
    } else {
      setCurrentSong({ ...currentSong, liked: true });
    }
  };

  // 播放功能
  const playMusic = useCallback(
    (song, index) => {
      if (!isPro && index >= FREE_PLAY_LIMIT) {
        alert("升級 InnerSoul Pro，解鎖完整播放清單");
        return;
      }
      // 播放中 + 同一首 → pause
      if (isPlaying && currentSong?.fileUrl === song.fileUrl) {
        audioRef.current.pause();
        setIsPlaying(false);
        return;
      }
      // 播新歌 or 從暫停狀態播放
      if (!audioRef.current) {
        audioRef.current = new Audio(song.fileUrl);
        setPlayerType("bar");
      } else if (currentSong?.fileUrl !== song.fileUrl) {
        audioRef.current.src = song.fileUrl;
      }
      audioRef.current.play();
      setCurrentSong(song);
      setCurrentIndex(index);
      setIsPlaying(true);
    },
    [isPro, isPlaying, currentSong, setIsPlaying, setCurrentSong, setCurrentIndex]
  );

  useEffect(() => {
    if (!songList || !songList[startIndex]) return;
    playMusic(songList[startIndex], startIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playTrigger]);

  const lastPlayedUrlRef = useRef(null);
  // 清單歌曲
  useEffect(() => {
    if (!songList || songList.length === 0) return;
    const song = songList[startIndex];
    if (!song) return;
    if (lastPlayedUrlRef.current === song.fileUrl) return;
    lastPlayedUrlRef.current = song.fileUrl;
    setTimeout(() => {
      playMusic(song, startIndex);
    }, 0);
  }, [songList, startIndex, playMusic]);

  // 重複播放功能
  const [repeatType, setRepeatType] = useState("none");
  const repeat = () => {
    // 狀態判斷
    setRepeatType((pre) => {
      switch (pre) {
        // 不循環
        case "none":
          return "singleRepeat";
        // 單曲循環
        case "singleRepeat":
          return "listRepeat";
        // 清單循環
        case "listRepeat":
          return "none";
      }
    });
  };
  // 上一首選擇
  const prevSong = () => {
    switch (repeatType) {
      case "singleRepeat": {
        // 不要走playMusic()直接操控
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setIsPlaying(true);
        break;
      }
      case "listRepeat": {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : songList.length - 1;
        playMusic(songList[prevIndex], prevIndex);
        break;
      }
      default: {
        if (currentIndex > 0) {
          playMusic(songList[currentIndex - 1], currentIndex - 1);
        } else {
          setIsPlaying(false);
          audioRef.current.pause();
        }
        break;
      }
    }
  };
  // 下一首選擇
  const nextSong = useCallback(() => {
    if (!songList || songList.length === 0) return;
    const nextIndex = currentIndex + 1;
    switch (repeatType) {
      case "singleRepeat": {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setIsPlaying(true);
        break;
      }
      case "listRepeat": {
        const loopIndex = nextIndex < songList.length ? nextIndex : 0;
        if (!isPro && loopIndex >= FREE_PLAY_LIMIT) {
          audioRef.current.pause();
          setIsPlaying(false);
          alert("非 Pro 用戶僅能播放前三首");
          return;
        }
        playMusic(songList[loopIndex], loopIndex);
        break;
      }

      default: {
        if (!isPro && nextIndex < songList.length && nextIndex >= FREE_PLAY_LIMIT) {
          audioRef.current.pause();
          setIsPlaying(false);
          alert("非 Pro 用戶僅能播放前三首");
          return;
        }
        if (nextIndex < songList.length) {
          playMusic(songList[nextIndex], nextIndex);
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
        break;
      }
    }
  }, [repeatType, currentIndex, songList, isPro, playMusic, setIsPlaying]);

  // 自動播放
  useEffect(() => {
    if (!audioRef.current) return;
    //onended告訴瀏覽器，音樂播完要做什麼
    audioRef.current.onended = () => {
      nextSong();
    };
    return () => {
      audioRef.current.onended = null;
    };
  }, [nextSong]); //即repeatType,currentIndex,songList改變時刷新

  // 切換播放器
  const changePlayer = () => {
    switch (playerType) {
      case "mini":
        setPlayerType("bar");
        break;
      case "bar":
        setPlayerType("mini");
        break;
      default:
        break;
    }
  };
  // 點擊外部收合player
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (playerType !== "mini") return;
      if (playerRef.current && !playerRef.current.contains(e.target)) {
        setPlayerType("bar");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [playerType]);

  // 進度條
  const [barValue, setBarValue] = useState(0);
  const [duration, setDuration] = useState(0);
  // 拖曳換時間功能
  const changeBar = (e) => {
    const time = Number(e.target.value);
    setBarValue(time);
    audioRef.current.currentTime = time;
  };
  // 取得時間軸
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => {
      setBarValue(audio.currentTime);
    };
    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };
    // 綁定監聽事件
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    // 取消綁定（避免重複），但資料不會消失
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [currentSong]);

  // 音量控制 =>不要用modal有點醜，會全域暗調
  const [volume, setVolume] = useState(0.5);
  const miniVolumeRef = useRef(null);
  const barVolumeRef = useRef(null);
  const [showVolume, setShowVolume] = useState(false);
  const changeVolume = (e) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };
  // 收合音量彈窗
  useEffect(() => {
    if (!showVolume) return;
    const handleClickOutside = (e) => {
      const currentRef = playerType === "mini" ? miniVolumeRef.current : barVolumeRef.current;
      if (currentRef && !currentRef.contains(e.target)) {
        setShowVolume(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showVolume, playerType]);

  // icon管理
  let VolumeIcon;
  if (volume === 0) {
    VolumeIcon = IconVolumeOff;
  } else if (volume > 0.5) {
    VolumeIcon = IconVolume;
  } else {
    VolumeIcon = IconVolume2;
  }

  let PlayIcon;
  !isPlaying ? (PlayIcon = IconPlayerPlayFilled) : (PlayIcon = IconPlayerPauseFilled);

  let RepeatIcon;
  repeatType === "none"
    ? (RepeatIcon = IconRepeatOff)
    : repeatType === "singleRepeat"
      ? (RepeatIcon = IconRepeatOnce)
      : (RepeatIcon = IconRepeat);

  return (
    <>
      <section className="player" ref={playerRef}>
        {playerType === "mini" ? (
          /* mini player */
          <div className="px-4 " style={{ width: "548px" }}>
            {/* 播放清單 */}
            <div className="bg-white rounded-top rounded-3">
              <div className="d-flex align-items-center justify-content-center bg-BG-01 ps-6 py-3">
                <p className="mb-0 text-primary-05 fw-bold">播放清單</p>
                <div className="btn ms-auto border-0 text-primary-05">
                  <IconChevronDown size={32} onClick={() => changePlayer()} />
                </div>
              </div>
              <ul className="text-start px-6 pt-5">
                {songList.map((song, index) => {
                  return (
                    <li
                      onClick={() => playMusic(song, index)}
                      className={`d-flex w-100 align-items-center  ${currentSong?.fileUrl === song.fileUrl ? " text-primary-05 fw-bold" : "list-item"}`}
                      key={index}
                    >
                      <p className="m-0">
                        {song.category} | {song.fileName}
                      </p>
                      <button
                        className={`btn border-0 ms-auto item-play ${currentSong?.fileUrl === song.fileUrl ? " text-primary-05" : "list-item"}`}
                      >
                        <playIcon size={24} />
                        {!isPlaying && currentSong?.fileUrl === song.fileUrl ? (
                          <IconPlayerPlayFilled size={24} />
                        ) : (
                          <IconPlayerPauseFilled size={24} />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
              {/* 正在播放，有播放才顯示*/}
              {currentSong && (
                <div
                  className="text-start d-flex px-6 align-items-center "
                  style={{ background: "linear-gradient(to top, #F5F5DC50, #fff)" }}
                >
                  <p className="me-auto mb-0 text-primary-05 fw-bold">{`${currentSong.category} | ${currentSong.fileName}`}</p>
                  <button className="btn border-0 text-primary-05" onClick={() => favorite()}>
                    {currentSong.liked ? <IconHeartFilled size={24} /> : <IconHeart size={24} />}
                  </button>
                </div>
              )}
            </div>
            {/* 進度條 */}
            {/* 下方按鈕 */}
            <div className="position-relative">
              <input
                className="sidebar position-absolute top-0 w-100 translate-middle start-50"
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={barValue}
                onChange={changeBar}
              />
              <div className="d-flex justify-content-center bg-white">
                <div className="btn border-0  text-primary-05" ref={miniVolumeRef}>
                  <VolumeIcon size={32} onClick={() => setShowVolume((v) => !v)} />
                  {showVolume && (
                    <div className="volume-panel volume-panel-mini">
                      <input
                        className="w-100"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={changeVolume}
                      />
                    </div>
                  )}
                </div>
                <div className="btn border-0  text-primary-05" onClick={() => prevSong()}>
                  <IconPlayerSkipBackFilled size={32} />
                </div>
                <div
                  className="btn border-0  text-primary-05"
                  onClick={() => playMusic(songList[currentIndex], currentIndex)}
                >
                  <PlayIcon size={32} />
                </div>
                <div className="btn border-0  text-primary-05" onClick={() => nextSong()}>
                  <IconPlayerSkipForwardFilled size={32} />
                </div>
                <div className="btn border-0  text-primary-05" onClick={() => repeat()}>
                  <RepeatIcon size={32} />
                </div>
                <div className="btn border-0 text-primary-05">
                  <IconList size={32} onClick={() => changePlayer()} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* bar player */
          <div>
            <div>
              <input
                className="w-100 sidebar sidebar position-absolute top-0 w-100 translate-middle start-50"
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={barValue}
                onChange={changeBar}
              />
            </div>
            <div className="bg-white">
              <div className="btn border-0  text-primary-05" ref={barVolumeRef}>
                <VolumeIcon size={32} onClick={() => setShowVolume((v) => !v)} />
                {showVolume && (
                  <div className="volume-panel volume-panel-bar">
                    <input
                      className="w-100 "
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={changeVolume}
                    />
                  </div>
                )}
              </div>
              <div
                className="btn border-0  text-primary-05"
                onClick={() => playMusic(songList[currentIndex], currentIndex)}
              >
                <PlayIcon size={32} />
              </div>
              <div className="btn border-0  text-primary-05" onClick={() => changePlayer()}>
                <IconList size={32} />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Player;
