import { useState, useEffect } from "react";
import { IconPlayerPlay, IconPlus, IconChevronLeft, IconChevronRight, IconDotsVertical } from "@tabler/icons-react";
import PlaylistCard from "../../components/features/member/PlaylistCard";
import "./PlaylistsPage.scss";

function PlaylistsPage() {
    const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [playlistSongs, setPlaylistSongs] = useState([]);
    const [recommendedPlaylists, setRecommendedPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPlaylists();
    }, []);

    useEffect(() => {
        if (userPlaylists.length > 0) {
            fetchPlaylistSongs(userPlaylists[currentPlaylistIndex]);
        }
    }, [currentPlaylistIndex, userPlaylists]);

    const fetchPlaylists = async () => {
        setIsLoading(true);
        try {
            // TODO: API 整合
            // 模擬數據
            const mockPlaylists = [
                {
                    id: 1,
                    listName: "孤獨",
                    listDescription: "世界再吵，我都在陪你一起聽著心的聲音",
                    listCover: "",
                    songsID: [1, 2, 3, 4, 5],
                    popularity: 23,
                },
                {
                    id: 2,
                    listName: "平靜",
                    listDescription: "沉澱心靈，找回內心的平和",
                    listCover: "",
                    songsID: [6, 7, 8],
                    popularity: 18,
                },
            ];

            const mockRecommended = [
                { id: 3, listName: "早晨精選", songsID: [1, 2], popularity: 45, tag: "小編推薦" },
                { id: 4, listName: "Work Work Work", songsID: [3, 4], popularity: 62, tag: "心情推薦" },
                { id: 5, listName: "週一上不去 blue，我們", songsID: [5, 6], popularity: 35, tag: "華人首選" },
                { id: 6, listName: "水過鴨 20 輯門", songsID: [7, 8], popularity: 51, tag: "熱播 Top 20" },
            ];

            setUserPlaylists(mockPlaylists);
            setRecommendedPlaylists(mockRecommended);
        } catch (error) {
            console.error("獲取播放清單失敗", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPlaylistSongs = async (playlist) => {
        if (!playlist) return;

        try {
            // TODO: API 整合
            // 模擬歌曲數據
            const mockSongs = [
                { id: 1, fileName: "在寂寞被撫養的時刻", author: "喜悅", isPlaying: false },
                { id: 2, fileName: "在青草愛假性的時刻", author: "喜悅", isPlaying: false },
                { id: 3, fileName: "在寂寞被挽留的時刻", author: "喜悅", isPlaying: false },
                { id: 4, fileName: "在寂寞被溫暖對待的時刻", author: "喜悅", isPlaying: false },
                { id: 5, fileName: "在寂寞被來朱對的時刻", author: "喜悅", isPlaying: false },
            ];

            setPlaylistSongs(mockSongs);
        } catch (error) {
            console.error("獲取歌曲列表失敗", error);
        }
    };

    const handlePrevPlaylist = () => {
        setCurrentPlaylistIndex((prev) =>
            prev > 0 ? prev - 1 : userPlaylists.length - 1
        );
    };

    const handleNextPlaylist = () => {
        setCurrentPlaylistIndex((prev) =>
            prev < userPlaylists.length - 1 ? prev + 1 : 0
        );
    };

    const handlePlaySong = (song) => {
        console.log("播放歌曲", song);
        // TODO: 整合播放器
    };

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
        <div className="playlists-page">
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
                        {currentPlaylist && (
                            <PlaylistCard
                                playlist={currentPlaylist}
                                size="large"
                            />
                        )}
                    </div>

                    {/* 右側：歌曲列表 */}
                    <div className="playlist-songs">
                        <ul className="song-list">
                            {playlistSongs.map((song, index) => (
                                <li key={song.id} className="song-item">
                                    <div className="song-info-row">
                                        <span className="music-icon">🎵</span>
                                        <span className="mood-tag">{song.author}</span>
                                        <span className="song-name">{song.fileName}</span>
                                    </div>
                                    <div className="song-actions-row">
                                        <button
                                            className="play-pause-btn"
                                            onClick={() => handlePlaySong(song)}
                                        >
                                            {song.isPlaying ? "⏸" : "▶"}
                                        </button>
                                        <button className="menu-btn">
                                            <IconDotsVertical size={18} />
                                        </button>
                                    </div>
                                </li>
                            ))}
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
                            {currentPlaylistIndex + 1}
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
                    {recommendedPlaylists.map((playlist) => (
                        <div key={playlist.id} className="recommended-item">
                            <div className="recommended-card">
                                {playlist.tag && (
                                    <span className="playlist-tag">{playlist.tag}</span>
                                )}
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
                                    onClick={() => handleRecommendedClick(playlist)}
                                >
                                    <IconPlayerPlay size={24} fill="currentColor" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default PlaylistsPage;
