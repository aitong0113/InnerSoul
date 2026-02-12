import api from "./api";

/**
 * 獲取用戶的所有日記
 * @param {number} userId - 用戶 ID
 * @returns {Promise<Array>} 日記列表
 */
export async function getUserDiaries(userId) {
    try {
        const res = await api.get(`/diaries?userId=${userId}`);
        return res.data;
    } catch (err) {
        console.error("獲取日記失敗", err);
        throw err;
    }
}

/**
 * 獲取用戶擁有的播放清單
 * @param {number} userId - 用戶 ID
 * @returns {Promise<Array>} 播放清單列表
 */
export async function getUserPlaylists(userId) {
    try {
        const res = await api.get(`/lists?ownerID=${userId}`);
        return res.data;
    } catch (err) {
        console.error("獲取播放清單失敗", err);
        throw err;
    }
}

/**
 * 獲取用戶收藏的歌曲數量
 * @param {number} userId - 用戶 ID
 * @returns {Promise<number>} 收藏數量
 */
export async function getUserSongLikesCount(userId) {
    try {
        const res = await api.get(`/songLikes?userId=${userId}`);
        return res.data.length;
    } catch (err) {
        console.error("獲取收藏失敗", err);
        throw err;
    }
}
