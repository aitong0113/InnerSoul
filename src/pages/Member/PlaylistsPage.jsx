import { useState, useEffect } from "react";
import api from "../../services/api";
import { useSelector } from "react-redux";

import {
  IconPlayerPlay,
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
  const { currentIndex, isPlaying, currentListId } = useSelector((state) => state.player);

  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [recommendedPlaylists, setRecommendedPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //   const followedPlaylistIds = useSelector((state) => state.playlistFollows.followedPlaylistIds);

  //   api 清單
  const fetchPlaylists = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/lists");
      // 如果 API 回來已經有 songsID，直接用
      setUserPlaylists(res.data);
      // 推薦清單：
      setRecommendedPlaylists(
        res.data
          .slice()
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 4)
      );
    } catch (error) {
      console.error("獲取播放清單失敗", error);
    } finally {
      setIsLoading(false);
    }
  };

  //   api歌曲
  const fetchPlaylistSongs = async (playlist) => {
    if (!playlist) return;
    try {
      const res = await api.get("/songs");
      // 查找歌曲
      const songMap = new Map(res.data.map((song) => [Number(song.id), song]));
      const songs = (playlist.songsID || [])
        .map((id) => songMap.get(Number(id)))
        .filter(Boolean)
        .map((song) => ({
          ...song,
          isPlaying: false,
        }));
      setPlaylistSongs(songs);
    } catch (error) {
      console.error("獲取歌曲列表失敗", error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  useEffect(() => {
    if (userPlaylists.length > 0) {
      fetchPlaylistSongs(userPlaylists[currentPlaylistIndex]);
    }
  }, [currentPlaylistIndex, userPlaylists]);

  const handlePrevPlaylist = () => {
    setCurrentPlaylistIndex((prev) => (prev > 0 ? prev - 1 : userPlaylists.length - 1));
  };

  const handleNextPlaylist = () => {
    setCurrentPlaylistIndex((prev) => (prev < userPlaylists.length - 1 ? prev + 1 : 0));
  };

  //   const handlePlaySong = (song) => {
  //     console.log("播放歌曲", song);
  //     // TODO: 整合播放器
  //   };

  const handleAddSong = () => {
    console.log("新增語音到清單");
    // TODO: 實作新增語音功能
  };

  const handleCreatePlaylist = () => {
    console.log("新增播放清單");
    // TODO: 實作新增清單功能
  };

  const handleRecommendedClick = (playlist) => {
    console.log("查看推薦清單", playlist);
    // TODO: 導向清單詳情
  };

  if (isLoading) {
    return (
      <div className="playlists-page loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">載入中...</span>
        </div>
      </div>
    );
  }
  const currentPlaylist = userPlaylists[currentPlaylistIndex];

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

      {/* 播放清單詳情區域 */}
      <section className="playlist-detail-section">
        <div className="playlist-detail-grid">
          {/* 左側：播放清單大卡片 */}
          <div className="playlist-detail-card">
            {currentPlaylist && <PlaylistCard playlist={currentPlaylist} size="large" />}
          </div>

          {/* 右側：歌曲列表 */}
          <div className="playlist-songs">
            <ul className="song-list">
              {playlistSongs.map((song, index) => {
                //   icon控制
                const isCurrent = currentListId === currentPlaylist.id && currentIndex === index;
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
        {userPlaylists.length > 1 && (
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={handlePrevPlaylist}
              disabled={userPlaylists.length <= 1}
            >
              <IconChevronLeft size={20} />
            </button>
            <span className="page-indicator">
              {currentPlaylistIndex + 1} / {userPlaylists.length}
            </span>
            <button
              className="pagination-btn"
              onClick={handleNextPlaylist}
              disabled={userPlaylists.length <= 1}
            >
              <IconChevronRight size={20} />
            </button>
          </div>
        )}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("加入播放清單", playlist);
                    }}
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
