import { useMemo, useState, useEffect } from "react";
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
import { addSongToPlaylist } from "../../slices/memberPlaylistSlice";
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconChevronRight,
  IconChevronLeft,
  IconDotsVertical,
} from "@tabler/icons-react";

function FavoritesPage({ selectPlaylist }) {
  const dispatch = useDispatch();
  const selectLikesView = useMemo(() => makeSelectUserLikesView(), []);
  const { currentListId, currentIndex, isPlaying } = useSelector((state) => state.player);

  const userId = authStore.getUserId();
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
  const recentSongs = useMemo(() => likedPlaylist.songs.slice(0, 4), [likedPlaylist.songs]);
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
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <div className="favorites-page">
      <h2 className="page-title">我的語音收藏</h2>

      {/* 我的收藏歌曲 */}
      <section>
        <div className="d-flex">
          {/* 左側 */}
          <div>我的全部收藏</div>
          {/* 右側 */}
          <div>
            {likedPlaylist.songs.length === 0 ? (
              <div className="empty-state">你還沒有收藏任何語音 🎵</div>
            ) : (
              <ul>
                {paginatedLikedSongs.map((song, index) => {
                  const globalIndex = (page - 1) * PAGE_SIZE + index;
                  const isCurrent =
                    currentListId === likedPlaylist.id && currentIndex === globalIndex;
                  const showPause = isCurrent && isPlaying;

                  return (
                    <li
                      key={song.id}
                      className={`d-flex w-100 align-items-center justify-content-between ${
                        isCurrent ? "text-primary-05 fw-bold" : "list-item"
                      }`}
                    >
                      <div className="song-info-row">
                        <span className="music-icon">🎵</span>
                        <span className="mood-tag badge bg-BG-03 ms-2">{song.category}</span>
                        <span className="song-name ms-2">{song.name}</span>
                      </div>

                      <div className="song-actions-row d-flex">
                        <button
                          className="btn border-0"
                          onClick={() => handlePlayLikedSong(globalIndex)}
                        >
                          {showPause ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
                        </button>
                        <div className=" position-relative">
                          <button
                            className="btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === song.id ? null : song.id);
                            }}
                          >
                            <IconDotsVertical size={18} />
                          </button>
                          {openMenuId === song.id && (
                            <div
                              className="custom-dropdown-menu position-absolute py-4 bg-complementary-04"
                              style={{ width: "150px" }}
                            >
                              <div
                                className="px-3 dropdown-item d-flex justify-content-between align-items-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenSubmenuId(openSubmenuId === song.id ? null : song.id);
                                }}
                              >
                                加入播放清單
                              </div>
                              {openSubmenuId === song.id && (
                                <div
                                  className="submenu position-absolute bg-white shadow"
                                  style={{
                                    top: 0,
                                    left: "100%",
                                    width: "180px",
                                  }}
                                >
                                  {playlists
                                    .filter((pl) => pl.ownerId === userId)
                                    .map((pl) => (
                                      <div
                                        key={pl.id}
                                        className="px-3 py-2 dropdown-item"
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
                                className="px-3 dropdown-item"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(toggleSongLike({ userId, songId: song.id }));
                                  setOpenMenuId(null);
                                  setPage(1);
                                }}
                              >
                                取消收藏
                              </div>
                              <div className="px-3 dropdown-item">分享</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
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
      </section>

      {/* 最新收藏區塊 */}
      <section className="favorites-section">
        <h3 className="section-title">我的最新收藏</h3>
        <div className="song-grid">
          {recentSongs.map((song) => (
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
            />
          ))}
        </div>
      </section>

      {/* 高人氣收藏區塊 */}
      <section className="favorites-section">
        <h3 className="section-title">推薦高人氣</h3>
        <div className="song-grid">
          {popularSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              showPlayButton={true}
              showFavoriteButton={true}
              isFavorited={likedSongIds.includes(song.id)}
              onPlay={handlePlayOriginal}
              onFavorite={(song) => dispatch(toggleSongLike({ userId, songId: song.id }))}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default FavoritesPage;
