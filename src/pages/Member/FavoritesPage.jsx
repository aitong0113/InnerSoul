import { useMemo } from "react";
import SongCard from "../../components/features/member/SongCard";
import PlaylistCard from "../../components/features/member/PlaylistCard";
import FilterTabs from "../../components/features/member/FilterTabs";
import "./FavoritesPage.scss";
import { makeSelectUserLikesView, selectPlaylistsView } from "../../slices/selectors";
import { toggleSongLike } from "../../slices/userLikeSlice";

import { useDispatch, useSelector } from "react-redux";
import { authStore } from "../../services/auth/authStore";

function FavoritesPage({ selectPlaylist }) {
  const dispatch = useDispatch();
  const selectLikesView = useMemo(() => makeSelectUserLikesView(), []);

  const userId = authStore.getUserId();
  // Redux State
  const playlists = useSelector((state) => selectPlaylistsView(state, userId));
  const { songs, likedSongIds } = useSelector((state) => selectLikesView(state, userId));

  const songMap = useMemo(() => {
    const map = new Map();
    songs.forEach((s) => map.set(s.id, s));
    return map;
  }, [songs]);

  const likedSongs = useMemo(() => {
    return [...likedSongIds]
      .reverse()
      .map((id) => songMap.get(id))
      .filter(Boolean);
  }, [likedSongIds, songMap]);
  const likedSet = useMemo(() => new Set(likedSongIds), [likedSongIds]);

  const unlikedSongs = useMemo(() => songs.filter((s) => !likedSet.has(s.id)), [songs, likedSet]);

  // UI 區塊資料
  const recentSongs = useMemo(() => likedSongs.slice(0, 4), [likedSongs]);
  const popularSongs = useMemo(() => {
    return [...unlikedSongs].sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0)).slice(0, 4);
  }, [unlikedSongs]);
  const favoritePlaylists = useMemo(() => {
    return playlists.filter((p) => p.isFollowed && p.ownerId !== userId).slice(0, 4);
  }, [playlists, userId]);

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
  const handlePlayLikedSong = (song) => {
    const found = songIndexMap.get(song.id);
    if (!found) return;
    selectPlaylist(found.playlistId, found.index);
  };

  return (
    <div className="favorites-page">
      <h2 className="page-title">我的語音收藏</h2>

      {/* 收藏清單區塊 */}
      <section className="favorites-section">
        <div className="playlist-grid">
          {favoritePlaylists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              size="small"
              showEditButton={false}
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
              isFavorited={likedSet.has(song.id)}
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
