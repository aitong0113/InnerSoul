import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authStore } from "../../services/auth/authStore";
import { togglePlaylistFollow } from "../../slices/playlistFollowSlice";
import { selectPlaylistsView } from "../../slices/selectors";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

import {
  IconPlus,
  IconChevronLeft,
  IconChevronRight,
  IconDotsVertical,
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from "@tabler/icons-react";
import PlaylistCard from "../../components/features/member/PlaylistCard";
import "./PlaylistsPage.scss";

function PlaylistsPage({ selectPlaylist }) {
  const userId = authStore.getUserId();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.playlists.status);
  const followStatus = useSelector((state) => state.playlistFollow.status);

  const playlists = useSelector((state) => selectPlaylistsView(state, userId));
  const ownedPlaylists = playlists.filter((p) => p.ownerId === userId);

  const { currentIndex, isPlaying, currentListId } = useSelector((state) => state.player);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);

  const followedPlaylists = playlists.filter((p) => p.isFollowed && p.ownerId !== userId);

  const safeIndex =
    ownedPlaylists.length === 0 ? 0 : Math.min(currentPlaylistIndex, ownedPlaylists.length - 1);
  const currentPlaylist = ownedPlaylists[safeIndex] ?? null;
  const playlistSongs = currentPlaylist?.songs || [];

  const recommendedPlaylists = playlists.filter((p) => !p.isFollowed).slice(0, 4);
  //三個點的選單
  const [openMenuId, setOpenMenuId] = useState(null);
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handlePrevPlaylist = () => {
    setCurrentPlaylistIndex((prev) => (prev > 0 ? prev - 1 : ownedPlaylists.length - 1));
  };

  const handleNextPlaylist = () => {
    setCurrentPlaylistIndex((prev) => (prev < ownedPlaylists.length - 1 ? prev + 1 : 0));
  };

  const handleToggleFollow = (playlistId) => {
    dispatch(togglePlaylistFollow({ userId, playlistId }));
  };

  const handleAddSong = () => {
    console.log("新增語音到清單");
    // TODO: 實作新增語音功能
  };

  const handleCreatePlaylist = () => {
    console.log("新增播放清單");
    // TODO: 實作新增清單功能
  };
  if (status === "loading" || followStatus === "loading") {
    return (
      <div className="playlists-page loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">載入中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="playlists-page ">
      <div className="page-header">
        <div>
          <h2 className="page-title">我的專屬播放清單</h2>
          <p className="page-subtitle">你的心在播放哪一段旋律？</p>
        </div>
        <button className="create-playlist-btn" onClick={handleCreatePlaylist}>
          <IconPlus size={20} />
          新增播放清單
        </button>
      </div>
      {followedPlaylists.length === 0 ? (
        <p>你還沒有追蹤任何播放清單</p>
      ) : (
        <section className="playlist-detail-section">
          {/* 播放清單詳情區域 */}
          <div className="playlist-detail-grid">
            {/* 左側：播放清單大卡片 */}
            <div className="playlist-detail-card">
              {currentPlaylist && (
                <PlaylistCard
                  playlist={currentPlaylist}
                  isFollowed={currentPlaylist.isFollowed}
                  onToggleFollow={() => handleToggleFollow(currentPlaylist.id)}
                  followerCount={currentPlaylist.followerCount}
                  size="large"
                />
              )}
            </div>

            {/* 右側：歌曲列表 */}
            <div className="playlist-songs">
              <ul className="song-list">
                {playlistSongs.map((song, index) => {
                  //   icon控制
                  const isCurrent = currentListId === currentPlaylist?.id && currentIndex === index;
                  const showPause = isCurrent && isPlaying;
                  return (
                    <li
                      key={song.id}
                      className={`song-item ${isCurrent ? "fw-bold text-primary-05" : null}`}
                    >
                      <div className="song-info-row">
                        <span className="music-icon">🎵</span>
                        <span className="mood-tag">{song.category}</span>
                        <span className="song-name">{song.name}</span>
                      </div>
                      <div className="song-actions-row">
                        <button
                          className={`play-pause-btn ${isCurrent ? " text-primary-05" : null}`}
                          onClick={() => selectPlaylist(currentPlaylist.id, index)}
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
                            <div
                              className="custom-dropdown-menu position-absolute py-4 bg-complementary-04"
                              style={{ width: "150px" }}
                            >
                              <li className="px-3 ">加入播放清單</li>
                              <li className="px-3 ">重新排列</li>
                              <li className="px-3 ">分享</li>
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <button className="add-song-btn" onClick={handleAddSong}>
                <IconPlus size={20} />
                新增語音
              </button>
            </div>
          </div>

          {/* 分頁控制 */}
          {ownedPlaylists.length > 1 && (
            <div className="pagination-controls">
              <button
                className="pagination-btn"
                onClick={handlePrevPlaylist}
                disabled={ownedPlaylists.length <= 1}
              >
                <IconChevronLeft size={20} />
              </button>
              <span className="page-indicator">
                {safeIndex + 1} / {ownedPlaylists.length}
              </span>
              <button
                className="pagination-btn"
                onClick={handleNextPlaylist}
                disabled={ownedPlaylists.length <= 1}
              >
                <IconChevronRight size={20} />
              </button>
            </div>
          )}
        </section>
      )}
      <section className="py-12">
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {followedPlaylists.map((list) => {
            return (
              <SwiperSlide key={list.id}>
                <div className="playlist-detail-card">
                  <PlaylistCard
                    playlist={list}
                    isFollowed={list.isFollowed}
                    onToggleFollow={() => handleToggleFollow(list.id)}
                    followerCount={list.followerCount}
                    size="large"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      {/* 推薦清單區域 */}
      <section className="recommended-section">
        <h3 className="section-title">這裡一收錄看相似的共鳴</h3>
        <p className="section-subtitle">大家都在聽</p>
        <div className="recommended-grid">
          {recommendedPlaylists.map((playlist) => {
            const isCurrent = playlist.id === currentListId;
            return (
              <div key={playlist.id} className="recommended-item">
                <div className="recommended-card">
                  {playlist.category && <span className="playlist-tag">{playlist.category}</span>}
                  <button
                    className="add-playlist-btn"
                    onClick={() => handleToggleFollow(playlist.id)}
                  >
                    <IconPlus size={18} />
                  </button>
                  <div className="cloud-placeholder">
                    <img
                      src={`${import.meta.env.BASE_URL}Union.png`}
                      alt="雲朵"
                      className="cloud-bg"
                    />
                  </div>
                  <h4 className="playlist-name">{playlist.listName}</h4>
                  <button
                    className="play-recommended-btn"
                    onClick={() => selectPlaylist(playlist.id)}
                  >
                    {isCurrent && isPlaying ? (
                      <IconPlayerPauseFilled size={24} />
                    ) : (
                      <IconPlayerPlayFilled size={24} />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default PlaylistsPage;
