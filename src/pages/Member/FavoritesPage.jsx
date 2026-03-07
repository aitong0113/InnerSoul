import { useMemo, useState, useEffect, useRef } from "react";
import SongCard from "../../components/features/member/SongCard";
import PlaylistCard from "../../components/features/member/PlaylistCard";
import FilterTabs from "../../components/features/member/FilterTabs";
import "./FavoritesPage.scss";
import {
  makeSelectUserLikesView,
  selectPlaylistsView,
  makeSelectLikedPlaylist,
} from "../../slices/selectors";
import { toggleSongLike } from "../../slices/userLikeSlice";

import { useDispatch, useSelector } from "react-redux";
import { authStore } from "../../services/auth/authStore";
import { addSongToPlaylist, fetchPlaylists } from "../../slices/memberPlaylistSlice";
import api from "../../services/api";
import { getUserAvatar } from "../../helpers/userAvatar";
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconChevronRight,
  IconChevronLeft,
  IconDotsVertical,
  IconPlus,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { fadeIn, scrollFadeIn } from "../../components/animation/motion";

function FavoritesPage({ selectPlaylist }) {
  const dispatch = useDispatch();
  const selectLikesView = useMemo(() => makeSelectUserLikesView(), []);
  const { currentListId, currentIndex, isPlaying } = useSelector((state) => state.player);

  const userId = authStore.getUserId();
  const userAvatarSrc = getUserAvatar(authStore.getUserImg());
  const selectLikedPlaylist = useMemo(() => makeSelectLikedPlaylist(), []);
  const likedPlaylist = useSelector((state) => selectLikedPlaylist(state, userId));

  // Redux State
  const playlists = useSelector((state) => selectPlaylistsView(state, userId));
  const { songs, likedSongIds } = useSelector((state) => selectLikesView(state, userId));

  //分頁功能
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(likedPlaylist.songs.length / PAGE_SIZE));
  }, [likedPlaylist.songs.length]);
  const paginatedLikedSongs = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return likedPlaylist.songs.slice(start, start + PAGE_SIZE);
  }, [likedPlaylist.songs, page]);

  const likedSet = useMemo(() => new Set(likedSongIds), [likedSongIds]);
  const unlikedSongs = useMemo(() => songs.filter((s) => !likedSet.has(s.id)), [songs, likedSet]);

  // UI 區塊資料
  // 播放反序
  const reversedSongs = useMemo(() => {
    return [...likedPlaylist.songs].reverse().slice(0, 4);
  }, [likedPlaylist.songs]);
  const popularSongs = useMemo(() => {
    return [...unlikedSongs].sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0)).slice(0, 4);
  }, [unlikedSongs]);

  // 播放對照表
  const songIndexMap = useMemo(() => {
    const map = new Map();
    playlists.forEach((pl) => {
      (pl.songs || []).forEach((s, idx) => {
        if (!map.has(s.id)) {
          map.set(s.id, { playlistId: pl.id, index: idx });
        }
      });
    });

    return map;
  }, [playlists]);

  // 功能
  const handlePlayOriginal = (song) => {
    const found = songIndexMap.get(song.id);
    if (!found) return;
    selectPlaylist(found.playlistId, found.index);
  };
  const handlePlayLikedSong = (globalIndex) => {
    selectPlaylist(likedPlaylist.id, globalIndex, likedPlaylist);
  };

  const [openMenuId, setOpenMenuId] = useState(null);
  const [openSubmenuId, setOpenSubmenuId] = useState(null);

  // 新增語音選單
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [hoveredAddPl, setHoveredAddPl] = useState(null);
  const [hoveredAddRect, setHoveredAddRect] = useState(null);
  const addMenuRef = useRef(null);
  const dotMenuRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const clearHoverWithDelay = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredAddPl(null);
    }, 150);
  };
  const cancelHoverClear = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (addMenuRef.current && !addMenuRef.current.contains(e.target)) {
        setShowAddMenu(false);
      }
      if (dotMenuRef.current && !dotMenuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 修改收藏清單
  const handleSaveEdit = async (playlistId, { listName, listDescription }) => {
    try {
      await api.patch(`/likes/${playlistId}`, { listName, listDescription });
      await dispatch(fetchPlaylists());
    } catch (err) {
      console.error("更新收藏清單失敗：", err);
      alert("更新收藏清單失敗，請稍後再試");
    }
  };

  // 刪除收藏清單（清空所有收藏）
  const handleDeleteFavorite = async (playlistId) => {
    try {
      // 取消所有收藏的歌曲
      for (const song of likedPlaylist.songs) {
        dispatch(toggleSongLike({ userId, songId: song.id }));
      }
      setPage(1);
    } catch (err) {
      console.error("刪除收藏失敗：", err);
      alert("刪除收藏失敗，請稍後再試");
    }
  };

  // 新增語音到收藏
  const handleAddSongToFavorites = (song) => {
    if (likedSongIds.includes(song.id)) {
      alert("這首語音已經在收藏裡了 🎵");
      return;
    }
    dispatch(toggleSongLike({ userId, songId: song.id }));
    setShowAddMenu(false);
  };
  return (
    <div className="favorites-page">
      <motion.h2 className="page-title" {...fadeIn()}>
        我的語音收藏
      </motion.h2>

      {/* 我的收藏歌曲 */}
      <motion.section className="playlist-detail-section" {...fadeIn()}>
        <div className="playlist-detail-grid">
          {/* 左側：收藏清單大卡片 */}
          <div className="playlist-detail-card">
            <PlaylistCard
              playlist={{ ...likedPlaylist, coverImg: userAvatarSrc }}
              size="large"
              isFollowed={false}
              // followerCount={likedPlaylist.songs.length}
              // showEditMode={true}
              // onSaveEdit={handleSaveEdit}
              // onDelete={handleDeleteFavorite}
            />
          </div>
          {/* 右側：歌曲列表 */}
          <div className="playlist-songs">
            {likedPlaylist.songs.length === 0 ? (
              <div className="empty-state">你還沒有收藏任何語音 🎵</div>
            ) : (
              <ul className="song-list">
                {paginatedLikedSongs.map((song, index) => {
                  const globalIndex = (page - 1) * PAGE_SIZE + index;
                  const isCurrent =
                    currentListId === likedPlaylist.id && currentIndex === globalIndex;
                  const showPause = isCurrent && isPlaying;

                  return (
                    <li
                      key={song.id}
                      className={`song-item ${isCurrent ? "text-primary-05 fw-bold" : ""}`}
                    >
                      <div className="song-info-row">
                        <span className="music-icon">🎵</span>
                        <span className="mood-tag">{song.category}</span>
                        <span className="song-name">{song.name}</span>
                      </div>

                      <div className="song-actions-row">
                        <button
                          className={`play-pause-btn ${isCurrent ? "text-primary-05" : ""}`}
                          onClick={() => handlePlayLikedSong(globalIndex)}
                        >
                          {showPause ? (
                            <IconPlayerPauseFilled size={24} />
                          ) : (
                            <IconPlayerPlayFilled size={24} />
                          )}
                        </button>
                        <div className="menu-wrap position-relative">
                          <button
                            className="menu-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === song.id ? null : song.id);
                            }}
                          >
                            <IconDotsVertical size={18} />
                          </button>
                          {openMenuId === song.id && (
                            <div ref={dotMenuRef} className="fav-dropdown position-absolute">
                              <div
                                className="fav-dropdown-item d-flex justify-content-between align-items-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenSubmenuId(openSubmenuId === song.id ? null : song.id);
                                }}
                              >
                                加入播放清單
                              </div>
                              {openSubmenuId === song.id && (
                                <div className="fav-submenu position-absolute">
                                  {playlists
                                    .filter((pl) => pl.ownerId === userId)
                                    .map((pl) => (
                                      <div
                                        key={pl.id}
                                        className="fav-submenu-item"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          dispatch(
                                            addSongToPlaylist({
                                              playlistId: pl.id,
                                              song: song,
                                            })
                                          )
                                            .unwrap()
                                            .then(() => {
                                              alert("已加入播放清單");
                                            })
                                            .catch((err) => {
                                              if (err === "duplicate") {
                                                alert("這首歌已經在播放清單裡了 🎵");
                                              } else {
                                                alert("加入失敗");
                                              }
                                            });
                                          setOpenMenuId(null);
                                          setOpenSubmenuId(null);
                                        }}
                                      >
                                        {pl.listName}
                                      </div>
                                    ))}
                                </div>
                              )}
                              <div
                                className="fav-dropdown-item"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(toggleSongLike({ userId, songId: song.id }));
                                  setOpenMenuId(null);
                                  setPage(1);
                                }}
                              >
                                取消收藏
                              </div>
                              {/* <div className="fav-dropdown-item">分享</div> */}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            {/* 新增語音按鈕 */}
            <div className="position-relative">
              <button
                className="add-song-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAddMenu((prev) => !prev);
                }}
              >
                <IconPlus size={20} />
                新增語音
              </button>

              {showAddMenu && (
                <>
                  <div
                    className="fav-dropdown fav-add-dropdown position-absolute"
                    ref={addMenuRef}
                    onMouseLeave={clearHoverWithDelay}
                  >
                    {playlists
                      .filter((pl) => pl.id !== likedPlaylist.id)
                      .map((pl) => (
                        <div
                          key={pl.id}
                          className={`fav-playlist-item${hoveredAddPl === pl.id ? " active" : ""}`}
                          onMouseEnter={(e) => {
                            cancelHoverClear();
                            setHoveredAddPl(pl.id);
                            setHoveredAddRect(e.currentTarget.getBoundingClientRect());
                          }}
                        >
                          <div className="fav-dropdown-item d-flex justify-content-between align-items-center">
                            {pl.listName}
                            <IconChevronLeft size={16} className="chevron-icon" />
                          </div>
                        </div>
                      ))}
                  </div>
                  {/* 浮動子選單 - 外推顯示 */}
                  {hoveredAddPl &&
                    hoveredAddRect &&
                    (() => {
                      const pl = playlists.find((p) => p.id === hoveredAddPl);
                      if (!pl) return null;
                      return (
                        <div
                          className="fav-submenu fav-submenu-fixed"
                          style={{
                            position: "fixed",
                            top: hoveredAddRect.top,
                            right: window.innerWidth - hoveredAddRect.left + 4,
                            zIndex: 10001,
                          }}
                          onMouseEnter={() => {
                            cancelHoverClear();
                            setHoveredAddPl(hoveredAddPl);
                          }}
                          onMouseLeave={clearHoverWithDelay}
                        >
                          {pl.songs.length === 0 ? (
                            <div className="fav-submenu-empty">此清單尚無語音</div>
                          ) : (
                            pl.songs.map((song) => (
                              <div
                                key={song.id}
                                className="fav-submenu-item"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddSongToFavorites(song);
                                }}
                              >
                                🎵 {song.name}
                              </div>
                            ))
                          )}
                        </div>
                      );
                    })()}
                </>
              )}
            </div>
          </div>
        </div>
        {/* 控制按鈕 */}
        <div className="pagination-controls">
          <button
            className="btn border-0"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            <IconChevronLeft />
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button
            className="btn border-0"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            <IconChevronRight></IconChevronRight>
          </button>
        </div>
      </motion.section>

      {/* 最新收藏區塊 */}
      <motion.section className="favorites-section" {...scrollFadeIn()}>
        <h3 className="section-title">我的最新收藏</h3>
        <div className="song-grid">
          {reversedSongs.map((song) => {
            const originalIndex = likedPlaylist.songs.findIndex((s) => s.id === song.id);
            const isPlayingSong =
              currentListId === likedPlaylist.id && currentIndex === originalIndex && isPlaying;
            return (
              <SongCard
                key={song.id}
                song={song}
                showPlayButton={true}
                showFavoriteButton={true}
                onPlay={(song) => {
                  const index = likedPlaylist.songs.findIndex((s) => s.id === song.id);
                  selectPlaylist(likedPlaylist.id, index, likedPlaylist);
                }}
                isFavorited={likedSet.has(song.id)}
                onFavorite={(song) => dispatch(toggleSongLike({ userId, songId: song.id }))}
                isPlayingSong={isPlayingSong}
              />
            );
          })}
        </div>
      </motion.section>

      {/* 高人氣收藏區塊 */}
      <motion.section className="favorites-section" {...scrollFadeIn(0.2)}>
        <h3 className="section-title">推薦高人氣</h3>
        <div className="song-grid">
          {popularSongs.map((song) => {
            const found = songIndexMap.get(song.id);
            const isPlayingSong =
              found &&
              currentListId === found.playlistId &&
              currentIndex === found.index &&
              isPlaying;
            return (
              <SongCard
                key={song.id}
                song={song}
                showPlayButton={true}
                showFavoriteButton={true}
                isFavorited={likedSongIds.includes(song.id)}
                onPlay={handlePlayOriginal}
                onFavorite={(song) => dispatch(toggleSongLike({ userId, songId: song.id }))}
                isPlayingSong={isPlayingSong}
              />
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}

export default FavoritesPage;
