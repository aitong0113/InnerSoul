import { useEffect, useState, useRef } from "react";
import "./player.css";
import * as bootstrap from "bootstrap";

function Player({ songList, startIndex }) {
  // 播放器狀態
  const [playerType, setPlayerType] = useState("none");
  const playerRef = useRef(null);
  // 清單歌曲
  useEffect(() => {
    if (!songList || songList.length === 0) return;
    const song = songList[startIndex];
    if (!song) return;
    if (currentSong?.fileUrl === song.fileUrl) return;
    playMusic(song, startIndex);
  }, [songList, startIndex]);

  // 播放單曲
  const [currentSong, setCurrentSong] = useState(null);
  //音檔位置
  const audioRef = useRef(null);
  // 播放狀態
  const [isPlaying, setIsPlaying] = useState(false);
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
  const playMusic = (song, index) => {
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
  };

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
  const nextSong = () => {
    switch (repeatType) {
      case "singleRepeat": {
        // 不要走playMusic()直接操控
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setIsPlaying(true);
        break;
      }
      case "listRepeat": {
        const nextIndex = currentIndex + 1 < songList.length ? currentIndex + 1 : 0;
        playMusic(songList[nextIndex], nextIndex);
        break;
      }
      default: {
        // 順著播但到最後就停
        if (currentIndex + 1 < songList.length) {
          playMusic(songList[currentIndex + 1], currentIndex + 1);
        } else {
          setIsPlaying(false);
          audioRef.current.pause();
        }
        break;
      }
    }
  };
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

  return (
    <>
      <section className="player" ref={playerRef}>
        {playerType === "mini" ? (
          /* mini player */
          <div className="px-4">
            {/* 播放清單 */}
            <div className="bg-white">
              <div className="d-flex align-items-center justify-content-center">
                <p>播放清單</p>
                <div className="btn ms-auto">
                  <i className="bi bi-chevron-down ms-auto" onClick={() => changePlayer()}></i>
                </div>
              </div>
              <ul className="text-start px-0">
                {songList.map((song, index) => {
                  return (
                    <li
                      onClick={() => playMusic(song, index)}
                      className={`d-flex w-100 align-items-center  ${currentSong?.fileUrl === song.fileUrl ? " text-primary" : "list-item"}`}
                      key={index}
                    >
                      <p className="m-0">
                        {song.category} | {song.fileName}
                      </p>
                      <button
                        className={`btn border-0 ms-auto item-play ${currentSong?.fileUrl === song.fileUrl ? " text-primary" : "list-item"}`}
                      >
                        <i
                          className={
                            isPlaying && currentSong?.fileUrl === song.fileUrl
                              ? "bi bi-pause-fill"
                              : "bi bi-play-fill"
                          }
                        ></i>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {/* 正在播放，有播放才顯示*/}
              {currentSong && (
                <div className="text-start d-flex" style={{ background: "gray" }}>
                  <p className="me-auto">{`${currentSong.category} | ${currentSong.fileName}`}</p>
                  <button className="btn border-0" onClick={() => favorite()}>
                    <i className={currentSong.liked ? "bi bi-heart-fill" : "bi bi-heart "}></i>
                  </button>
                </div>
              )}
            </div>
            {/* 進度條 */}
            <input
              className="sidebar"
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={barValue}
              onChange={changeBar}
            />
            {/* 下方按鈕 */}
            <div>
              <div className="d-flex justify-content-center">
                <div className="btn border-0" ref={miniVolumeRef}>
                  <i
                    className={`bi ${
                      volume === 0
                        ? "bi-volume-mute-fill"
                        : volume > 0.5
                          ? "bi-volume-up-fill"
                          : "bi-volume-down-fill"
                    }`}
                    onClick={() => setShowVolume((v) => !v)}
                  ></i>
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
                <div className="btn border-0" onClick={() => prevSong()}>
                  <i className="bi bi-chevron-bar-left"></i>
                </div>
                <div
                  className="btn border-0"
                  onClick={() => playMusic(songList[currentIndex], currentIndex)}
                >
                  <i className={isPlaying ? "bi bi-pause-fill" : "bi bi-play-fill"}></i>
                </div>
                <div className="btn border-0" onClick={() => nextSong()}>
                  <i className="bi bi-chevron-bar-right"></i>
                </div>
                <div className="btn border-0" onClick={() => repeat()}>
                  <i
                    className={
                      repeatType === "none"
                        ? "bi bi-ban"
                        : repeatType === "singleRepeat"
                          ? "bi bi-repeat-1"
                          : "bi bi-repeat"
                    }
                  ></i>
                </div>
                <div className="btn border-0">
                  <i className="bi bi-list-task" onClick={() => changePlayer()}></i>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* bar player */
          <div>
            <div style={{ marginBottom: "-10px" }}>
              <input
                className="w-100 sidebar"
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={barValue}
                onChange={changeBar}
              />
            </div>
            <div>
              <div className="btn border-0" ref={barVolumeRef}>
                <i
                  className={`bi ${
                    volume === 0
                      ? "bi-volume-mute-fill"
                      : volume > 0.5
                        ? "bi-volume-up-fill"
                        : "bi-volume-down-fill"
                  }`}
                  onClick={() => setShowVolume((v) => !v)}
                ></i>
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
                className="btn border-0"
                onClick={() => playMusic(songList[currentIndex], currentIndex)}
              >
                <i className={isPlaying ? "bi bi-pause-fill" : "bi bi-play-fill"}></i>
              </div>
              <div className="btn border-0">
                <i className="bi bi-list-task" onClick={() => changePlayer()}></i>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Player;
