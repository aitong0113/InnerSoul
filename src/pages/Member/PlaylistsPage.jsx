import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authStore } from "../../services/auth/authStore";
import { useDispatch } from "react-redux";
import { toggleFollow } from "../../slices/memberPlaylistSlice";
import { fetchPlaylists } from "../../slices/memberPlaylistSlice";

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

  const { currentIndex, isPlaying, currentListId } = useSelector((state) => state.player);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);

  const allPlaylists = useSelector((state) => state.playlists.allPlaylists);
  // const followedPlaylists = allPlaylists.filter((list) => followedPlaylistIds.includes(list.id));
  const followedPlaylists = allPlaylists.filter((list) => list.followerUserIds.includes(userId));
  const currentPlaylist = followedPlaylists[currentPlaylistIndex] ?? null;
  const playlistSongs = currentPlaylist?.songs || [];

  const isFollowed = (playlistId) => {
    const target = allPlaylists.find((p) => p.id === playlistId);
    return target?.followerUserIds.includes(userId);
  };
  const recommendedPlaylists = allPlaylists
    .filter((list) => !list.followerUserIds.includes(userId))
    .slice(0, 4);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPlaylists());
    }
  }, [status, userId, dispatch]);

  const handlePrevPlaylist = () => {
    setCurrentPlaylistIndex((prev) => (prev > 0 ? prev - 1 : followedPlaylists.length - 1));
  };

  const handleNextPlaylist = () => {
    setCurrentPlaylistIndex((prev) => (prev < followedPlaylists.length - 1 ? prev + 1 : 0));
  };

  const handleAddSong = () => {
    console.log("新增語音到清單");
    // TODO: 實作新增語音功能
  };

  const handleCreatePlaylist = () => {
    console.log("新增播放清單");
    // TODO: 實作新增清單功能
  };

  if (status === "loading") {
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
                  isFollowed={isFollowed(currentPlaylist.id)}
                  onToggleFollow={() =>
                    dispatch(
                      toggleFollow({
                        userId,
                        playlistId: currentPlaylist.id,
                      })
                    )
                  }
                  followerCount={currentPlaylist?.followerUserIds?.length ?? 0}
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
                        <span className="mood-tag">{song.author}</span>
                        <span className="song-name">{song.fileName}</span>
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
                        <button className="menu-btn">
                          <IconDotsVertical size={18} />
                        </button>
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
          {followedPlaylists.length > 1 && (
            <div className="pagination-controls">
              <button
                className="pagination-btn"
                onClick={handlePrevPlaylist}
                disabled={followedPlaylists.length <= 1}
              >
                <IconChevronLeft size={20} />
              </button>
              <span className="page-indicator">
                {currentPlaylistIndex + 1} / {followedPlaylists.length}
              </span>
              <button
                className="pagination-btn"
                onClick={handleNextPlaylist}
                disabled={followedPlaylists.length <= 1}
              >
                <IconChevronRight size={20} />
              </button>
            </div>
          )}
        </section>
      )}
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
                    onClick={() =>
                      dispatch(
                        toggleFollow({
                          userId,
                          playlistId: playlist.id,
                        })
                      )
                    }
                  >
                    <IconPlus size={18} />
                  </button>
                  <div className="cloud-placeholder">
                    <img src="/Union.png" alt="雲朵" />
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
