import { createSelector } from "@reduxjs/toolkit";
import { selectAllPlaylists } from "./memberPlaylistSlice";
import { selectFollowers } from "./playlistFollowSlice";
import { selectLikes } from "../slices/userLikeSlice";

/**
 *  UI 使用的資料
 */
export const selectPlaylistsView = createSelector(
  [selectAllPlaylists, selectFollowers, (_, userId) => userId],
  (playlists, followers, userId) => {
    const countMap = new Map();
    const myFollowSet = new Set();

    followers.forEach((f) => {
      countMap.set(f.playlistId, (countMap.get(f.playlistId) || 0) + 1);
      if (f.userId === userId) myFollowSet.add(f.playlistId);
    });

    return playlists.map((p) => ({
      ...p,
      followerCount: countMap.get(p.id) || 0,
      isFollowed: myFollowSet.has(p.id),
    }));
  }
);

export const makeSelectSongsView = () =>
  createSelector(
    [(_, songs) => songs, selectLikes, (_, __, userId) => userId],
    (songs, likes, userId) => {
      const countMap = new Map();
      const myLikeSet = new Set();

      likes.forEach((l) => {
        countMap.set(l.songId, (countMap.get(l.songId) || 0) + 1);
        if (l.userId === userId) myLikeSet.add(l.songId);
      });

      return songs.map((song) => ({
        ...song,
        likeCount: countMap.get(song.id) || 0,
        isLiked: myLikeSet.has(song.id),
      }));
    }
  );

export const makeSelectUserLikesView = () =>
  createSelector(
    [selectPlaylistsView, selectLikes, (_, userId) => userId],
    (playlists, likes, userId) => {
      /* ------------------ 去重 songs ------------------ */
      const songMap = new Map();

      playlists.forEach((pl) => {
        pl.songs?.forEach((song) => {
          if (!songMap.has(song.id)) {
            songMap.set(song.id, song);
          }
        });
      });

      const uniqueSongs = Array.from(songMap.values());

      /* ------------------ like 統計 ------------------ */
      const likeCountMap = new Map();
      const myLikeSet = new Set();

      likes.forEach((l) => {
        likeCountMap.set(l.songId, (likeCountMap.get(l.songId) || 0) + 1);
        if (l.userId === userId) myLikeSet.add(l.songId);
      });

      const songsView = uniqueSongs.map((song) => ({
        ...song,
        likeCount: likeCountMap.get(song.id) || 0,
        isLiked: myLikeSet.has(song.id),
      }));

      return {
        songs: songsView,
        likedSongIds: Array.from(myLikeSet),
      };
    }
  );

export const selectSongLikeCountMap = createSelector([selectLikes], (likes) => {
  const map = new Map();

  likes.forEach((l) => {
    map.set(l.songId, (map.get(l.songId) || 0) + 1);
  });

  return map;
});

export const makeSelectLikedPlaylist = () => {
  const selectUserLikesView = makeSelectUserLikesView();

  return createSelector(
    [selectUserLikesView, (_, userId) => userId],
    ({ songs, likedSongIds }, userId) => {
      const songMap = new Map();
      songs.forEach((s) => songMap.set(s.id, s));

      const likedSongs = likedSongIds
        .map((id) => songMap.get(id))
        .filter(Boolean)
        .reverse();

      return {
        id: `liked-${userId}`,
        listName: "我的收藏",
        category: "收藏",
        ownerId: userId,
        isVirtual: true,
        songs: likedSongs,
        songsID: likedSongs.map((s) => s.id),
      };
    }
  );
};
