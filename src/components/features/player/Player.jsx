import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { authStore } from "../../../services/auth/authStore";

import { toggle, next, prev, playAtIndex, cycleRepeat, pause } from "../../../slices/playerSlice";
import { toggleSongLike } from "../../../slices/userLikeSlice";
import { makeSelectUserLikesView } from "../../../slices/selectors";

import { IconMusic } from "@tabler/icons-react";

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

const BASE_URL = import.meta.env.BASE_URL;

function Player() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { songList, currentIndex, isPlaying, currentListId, currentListName } = useSelector(
    (state) => state.player
  );
  const repeatType = useSelector((state) => state.player.repeatType);
  const currentSong = songList[currentIndex] || null;

  const userId = authStore.getUserId();
  const selectLikesView = useMemo(() => makeSelectUserLikesView(), []);
  const { likedSongIds } = useSelector((state) => selectLikesView(state, userId));
  const isLiked = currentSong ? likedSongIds.includes(currentSong.id) : false;

  // 訂閱方案
  const FREE_PLAY_LIMIT = 3;
  const alertMessage = useCallback(async () => {
    const result = await Swal.fire({
      icon: "info",
      title: "試聽限制",
      text: "這份陪伴暫僅開放前三首試聽，升級訂閱即可完整聆聽。",
      confirmButtonText: "升級方案",
      showCancelButton: true,
      cancelButtonText: "稍後再說",
      confirmButtonColor: "#6C8E9E",
    });

    if (result.isConfirmed) {
      navigate("/subscription");
    }

    setPlayerType("bar");
  }, [navigate]);

  const loginAlert = async () => {
    const result = await Swal.fire({
      icon: "info",
      title: "需要登入",
      text: "登入後才能收藏這段聲音",
      confirmButtonText: "前往登入",
      showCancelButton: true,
      cancelButtonText: "稍後再說",
    });

    if (result.isConfirmed) {
      navigate("/login");
    }
  };

  const canPlayIndex = useCallback((index) => {
    const plan = authStore.getUserPlan() || "free";
    return plan === "pro" || index < FREE_PLAY_LIMIT;
  }, []);
  const tryPlayIndex = useCallback(
    async (index, fallbackAction) => {
      if (!canPlayIndex(index)) {
        dispatch(pause());
        await alertMessage();
        return;
      }
      fallbackAction();
    },
    [canPlayIndex, dispatch, alertMessage]
  );

  const onNext = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (repeatType === "single") {
      audio.currentTime = 0;
      audio.play().catch(() => {});
      return;
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex >= songList.length) {
      dispatch(next());
      return;
    }
    tryPlayIndex(nextIndex, () => dispatch(next()));
  }, [repeatType, currentIndex, songList.length, tryPlayIndex, dispatch]);

  const onPrev = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (repeatType === "single") {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      return;
    }
    let targetIndex;
    if (currentIndex === 0) {
      if (repeatType === "list") {
        targetIndex = songList.length - 1;
      } else {
        dispatch(prev());
        return;
      }
    } else {
      targetIndex = currentIndex - 1;
    }
    if (!canPlayIndex(targetIndex)) {
      dispatch(pause());
      await alertMessage();
      return;
    }
    dispatch(prev());
  }, [repeatType, currentIndex, songList.length, canPlayIndex, dispatch, alertMessage]);

  const onTogglePlay = useCallback(() => {
    dispatch(toggle());
  }, [dispatch]);

  // 播放器狀態
  const [playerType, setPlayerType] = useState(() => (songList.length ? "bar" : "none"));
  const playerRef = useRef(null);

  //音檔位置
  const audioRef = useRef(null);
  const lastListIdRef = useRef(null);

  // 切歌用
  useEffect(() => {
    if (!currentSong) return;
    const isListChanged = lastListIdRef.current !== currentListId;
    lastListIdRef.current = currentListId;
    const fullUrl = import.meta.env.BASE_URL + currentSong.fileUrl;
    if (!audioRef.current || isListChanged) {
      audioRef.current?.pause();
      audioRef.current = new Audio(fullUrl);
    } else {
      audioRef.current.src = fullUrl; //
    }

    audioRef.current.currentTime = 0;

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentIndex, currentListId, currentSong]);

  // 播放用
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // 重複播放
  const onRepeat = () => {
    dispatch(cycleRepeat());
  };

  // 自動播放
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.onended = () => {
      if (repeatType === "single") {
        audio.currentTime = 0;
        audio.play().catch(() => {});
        return;
      }

      onNext();
    };

    return () => {
      audio.onended = null;
    };
  }, [onNext, repeatType]);

  // 播放器狀態
  const changePlayer = () => {
    setPlayerType((prev) => (prev === "mini" ? "bar" : "mini"));
  };

  const handleClickSong = (index) => {
    if (currentIndex === index) {
      dispatch(toggle());
      return;
    }

    tryPlayIndex(index, () => dispatch(playAtIndex(index)));
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
          <div className="miniPlayer">
            {/* 播放清單 */}
            <div className="bg-white d-flex flex-column playlist">
              <div className="d-flex align-items-center justify-content-center bg-BG-01 ps-6 py-3">
                <p className="mb-0 text-primary-05 fw-bold">
                  <small className="fw-normal">播放清單</small>-{currentListName}
                </p>
                <div className="btn ms-auto border-0 text-primary-05">
                  <IconChevronDown size={32} onClick={() => changePlayer()} />
                </div>
              </div>
              <ul className="text-start px-6 py-5  playlist-scroll">
                {songList.map((song, index) => {
                  const isCurrent = currentIndex === index;
                  const showPause = isCurrent && isPlaying;

                  return (
                    <li
                      onClick={() => handleClickSong(index)}
                      className={`d-flex w-100 align-items-center ${
                        isCurrent ? "text-primary-05 fw-bold" : "list-item"
                      }`}
                      key={`${currentListId}-${index}`}
                    >
                      <p>
                        <IconMusic className="text-primary-05 me-2" size={20}></IconMusic>
                        <span className="me-4 badge rounded-pill bg-BG-02 text-black">
                          {song.category}
                        </span>
                        {song.name}
                      </p>
                      <button
                        className={`btn border-0 ms-auto item-play ${
                          isCurrent ? "text-primary-05" : "list-item"
                        }`}
                      >
                        {showPause ? (
                          <IconPlayerPauseFilled size={24} />
                        ) : (
                          <IconPlayerPlayFilled size={24} />
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
                  <p className="me-auto mb-0 text-primary-05 fw-bold">{`${currentSong.category} | ${currentSong.name}`}</p>
                  <button
                    className="btn border-0 text-primary-05"
                    onClick={() => {
                      if (!userId) {
                        loginAlert();
                        return;
                      }

                      dispatch(
                        toggleSongLike({
                          userId,
                          songId: currentSong.id,
                        })
                      );
                    }}
                    aria-label="喜歡"
                  >
                    {isLiked ? (
                      <IconHeartFilled size={24} className="text-primary-05" />
                    ) : (
                      <IconHeart size={24} className="text-primary-05" />
                    )}
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
                <div
                  className="btn border-0  text-primary-05 position-relative"
                  ref={miniVolumeRef}
                >
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
