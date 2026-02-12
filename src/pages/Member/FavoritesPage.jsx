import { useState, useEffect, useMemo } from "react";
import SongCard from "../../components/features/member/SongCard";
import PlaylistCard from "../../components/features/member/PlaylistCard";
import FilterTabs from "../../components/features/member/FilterTabs";
import "./FavoritesPage.scss";

import { useDispatch, useSelector } from "react-redux";
import { fetchLikedSongs, toggleSongLike } from "../../slices/userLikeSlice";
import { authStore } from "../../services/auth/authStore";

function FavoritesPage({ selectPlaylist }) {
  const dispatch = useDispatch();
  const userId = authStore.getUserId();

  //  Redux state
  const likedSongIds = useSelector((state) => state.userLikes.likedSongIds);
  const allPlaylists = useSelector((state) => state.playlists.allPlaylists);

  const [activeFilter, setActiveFilter] = useState("全部");
  const filterOptions = ["全部", "清爽", "開心", "孤獨"];

  useEffect(() => {
    if (userId) dispatch(fetchLikedSongs(userId));
  }, [userId, dispatch]);

  // 從 playlist slice 拿所有 songs
  const allSongs = allPlaylists.flatMap((pl) => pl.songs || []);

  // 避免重複（因為一首歌可能存在多個清單）
  const uniqueSongs = Array.from(new Map(allSongs.map((song) => [song.id, song])).values());

  // 只保留喜歡的歌
  const likedSongs = uniqueSongs.filter((song) => likedSongIds.includes(song.id));
  const unlikedSongs = uniqueSongs.filter((song) => !likedSongIds.includes(song.id));

  // 建立播放對照表（song → playlist + index）
  const songIndexMap = useMemo(() => {
    const map = new Map();
    allPlaylists.forEach((pl) => {
      (pl.songs || []).forEach((s, idx) => {
        if (!map.has(s.id)) {
          map.set(s.id, { playlistId: pl.id, index: idx });
        }
      });
    });

    return map;
  }, [allPlaylists]);

  const handlePlayLikedSong = (song) => {
    const found = songIndexMap.get(song.id);
    if (!found) return;
    selectPlaylist(found.playlistId, found.index);
  };

  const favoritePlaylists = useMemo(() => {
    return allPlaylists
      .filter((playlist) => playlist.followerUserIds?.includes(userId))
      .slice(0, 4);
  }, [allPlaylists, userId]);

  const recentSongs = likedSongs.slice(0, 4);
  const popularSongs = [...unlikedSongs]
    .sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0))
    .slice(0, 4);

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
              onClick={() => selectPlaylist(playlist.id)}
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
              showPlayButton={true}
              showFavoriteButton={true}
              onPlay={handlePlayLikedSong}
              isFavorited={likedSongIds.includes(song.id)}
              onFavorite={(song) => dispatch(toggleSongLike({ userId, songId: song.id }))}
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
              showPlayButton={true}
              showFavoriteButton={true}
              isFavorited={likedSongIds.includes(song.id)}
              onPlay={handlePlayLikedSong}
              onFavorite={(song) => dispatch(toggleSongLike({ userId, songId: song.id }))}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default FavoritesPage;
