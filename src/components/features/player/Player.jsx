import { useEffect, useState, useRef, useCallback } from "react";
import { authStore } from "../../../services/auth/authStore";
import { useDispatch, useSelector } from "react-redux";
import { toggle, next, prev, playAtIndex, cycleRepeat } from "../../../slices/playerSlice";

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

function Player() {
  const dispatch = useDispatch();
  const { songList, currentIndex, isPlaying } = useSelector((state) => state.player);
  const repeatType = useSelector((state) => state.player.repeatType);
  const currentSong = songList[currentIndex] || null;

  const onNext = useCallback(() => {
    dispatch(next());
  }, [dispatch]);

  const onPrev = useCallback(() => {
    dispatch(prev());
  }, [dispatch]);

  const onTogglePlay = useCallback(() => {
    dispatch(toggle());
  }, [dispatch]);

  const onPlayAtIndex = useCallback(
    (i) => {
      dispatch(playAtIndex(i));
    },
    [dispatch]
  );

  // 訂閱方案
  const plan = authStore.getUserPlan();
  const isPro = plan === "pro";
  const FREE_PLAY_LIMIT = 3;

  // 播放器狀態
  const [playerType, setPlayerType] = useState(() => (songList.length ? "bar" : "none"));
  const playerRef = useRef(null);

  //音檔位置
  const audioRef = useRef(null);

  // 收藏功能
  // const favorite = () => {
  //   if (currentSong.liked) {
  //     // 記得用{}，不然會報錯
  //     setCurrentSong({ ...currentSong, liked: false });
  //   } else {
  //     setCurrentSong({ ...currentSong, liked: true });
  //   }
  // };

  useEffect(() => {
    if (!currentSong) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(currentSong.fileUrl);
    } else {
      audioRef.current.src = currentSong.fileUrl;
    }

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [currentSong, isPlaying]);

  // 重複播放功能
  // const [repeatType, setRepeatType] = useState("none");
  // const repeat = () => {
  //   // 狀態判斷
  //   setRepeatType((pre) => {
  //     switch (pre) {
  //       // 不循環
  //       case "none":
  //         return "singleRepeat";
  //       // 單曲循環
  //       case "singleRepeat":
  //         return "listRepeat";
  //       // 清單循環
  //       case "listRepeat":
  //         return "none";
  //     }
  //   });
  // };
  const onRepeat = () => {
    console.log("repeat click");
    dispatch(cycleRepeat());
  };

  // 自動播放
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.onended = () => {
      onNext();
    };
    return () => {
      audio.onended = null;
    };
  }, [onNext]);

  // 播放器狀態
  const changePlayer = () => {
    setPlayerType((prev) => (prev === "mini" ? "bar" : "mini"));
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
    : repeatType === "single"
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
                      onClick={() => onPlayAtIndex(index)}
                      className={`d-flex w-100 align-items-center  ${currentSong?.fileUrl === song.fileUrl ? " text-primary-05 fw-bold" : "list-item"}`}
                      key={index}
                    >
                      <p className="m-0">
                        {song.category} | {song.fileName}
                      </p>
                      <button
                        className={`btn border-0 ms-auto item-play ${currentSong?.fileUrl === song.fileUrl ? " text-primary-05" : "list-item"}`}
                      >
                        <PlayIcon size={24} />
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
                  {/* <button className="btn border-0 text-primary-05" onClick={() => favorite()}>
                    {currentSong.liked ? <IconHeartFilled size={24} /> : <IconHeart size={24} />}
                  </button> */}
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
                <div className="btn border-0  text-primary-05" onClick={onPrev}>
                  <IconPlayerSkipBackFilled size={32} />
                </div>
                <div className="btn border-0  text-primary-05" onClick={onTogglePlay}>
                  <PlayIcon size={32} />
                </div>
                <div className="btn border-0  text-primary-05" onClick={onNext}>
                  <IconPlayerSkipForwardFilled size={32} />
                </div>
                <div className="btn border-0  text-primary-05" onClick={onRepeat}>
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
              <div className="btn border-0  text-primary-05" onClick={onTogglePlay}>
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
