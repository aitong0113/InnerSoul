import { useState, useEffect } from "react";
import SongCard from "../../components/features/member/SongCard";
import PlaylistCard from "../../components/features/member/PlaylistCard";
import FilterTabs from "../../components/features/member/FilterTabs";
import "./FavoritesPage.scss";

function FavoritesPage() {
    const [activeFilter, setActiveFilter] = useState("全部");
    const [favoritePlaylists, setFavoritePlaylists] = useState([]);
    const [recentSongs, setRecentSongs] = useState([]);
    const [popularSongs, setPopularSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const filterOptions = ["全部", "清爽", "開心", "孤獨"];

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        setIsLoading(true);
        try {
            // TODO: API 整合
            // 模擬數據
            const mockPlaylists = [
                { id: 1, listName: "清爽時刻就要", listCover: "", songsID: [1, 2, 3] },
                { id: 2, listName: "Blue 到不行", listCover: "", songsID: [4, 5] },
                { id: 3, listName: "開心想聽", listCover: "", songsID: [6, 7, 8] },
                { id: 4, listName: "孤獨讓語音陪", listCover: "", songsID: [9, 10] },
            ];

            const mockSongs = [
                { id: 1, fileName: "我獨自emo", author: "低落", category: "sad" },
                { id: 2, fileName: "我是隻小小鳥", author: "喜悅", category: "joy" },
                { id: 3, fileName: "落淚時分", author: "低落", category: "sad" },
                { id: 4, fileName: "天黑黑", author: "憤怒", category: "mad" },
            ];

            setFavoritePlaylists(mockPlaylists);
            setRecentSongs(mockSongs);
            setPopularSongs([...mockSongs].reverse());
        } catch (error) {
            console.error("獲取收藏失敗", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePlaySong = (song) => {
        console.log("播放歌曲", song);
        // TODO: 整合播放器
    };

    const handleAddToPlaylist = (song) => {
        console.log("加入清單", song);
        // TODO: 實作加入清單功能
    };

    const handleToggleFavorite = (song) => {
        console.log("切換收藏", song);
        // TODO: 實作收藏功能
    };

    const handlePlaylistClick = (playlist) => {
        console.log("打開播放清單", playlist);
        // TODO: 導向播放清單詳情或編輯
    };

    if (isLoading) {
        return (
            <div className="favorites-page loading">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">載入中...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-page">
            <h2 className="page-title">我的語音收藏</h2>

            {/* 收藏清單區塊 */}
            <section className="favorites-section">
                <h3 className="section-title">收藏清單</h3>
                <FilterTabs
                    options={filterOptions}
                    activeFilter={activeFilter}
                    onChange={setActiveFilter}
                />
                <div className="playlist-grid">
                    {favoritePlaylists.map((playlist) => (
                        <PlaylistCard
                            key={playlist.id}
                            playlist={playlist}
                            size="small"
                            showEditButton={true}
                            onClick={() => handlePlaylistClick(playlist)}
                        />
                    ))}
                </div>
            </section>

            {/* 最新收藏區塊 */}
            <section className="favorites-section">
                <h3 className="section-title">最新收藏</h3>
                <div className="song-grid">
                    {recentSongs.map((song) => (
                        <SongCard
                            key={song.id}
                            song={song}
                            showAddButton={true}
                            showFavoriteButton={false}
                            showPlayButton={true}
                            onPlay={handlePlaySong}
                            onAdd={handleAddToPlaylist}
                        />
                    ))}
                </div>
            </section>

            {/* 高人氣收藏區塊 */}
            <section className="favorites-section">
                <h3 className="section-title">高人氣收藏</h3>
                <div className="song-grid">
                    {popularSongs.map((song) => (
                        <SongCard
                            key={song.id}
                            song={song}
                            showAddButton={false}
                            showFavoriteButton={true}
                            showPlayButton={true}
                            isFavorited={true}
                            onPlay={handlePlaySong}
                            onFavorite={handleToggleFavorite}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default FavoritesPage;
