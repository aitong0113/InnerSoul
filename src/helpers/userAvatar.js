// 統一管理使用者頭像資源
import avatarAdmin from "../assets/userImg/admin.png";
import avatarYouyou from "../assets/userImg/悠悠.png";
import avatarXiaoTu from "../assets/userImg/小兔.png";
import avatarXiaoMeiTu from "../assets/userImg/小妹兔.png";
import avatarXiaoXiong from "../assets/userImg/小熊.png";
import avatarWangXiaoMing from "../assets/userImg/王小明.png";

// 頭像映射表
const AVATAR_MAP = {
  "admin.png": avatarAdmin,
  "悠悠.png": avatarYouyou,
  "小兔.png": avatarXiaoTu,
  "小妹兔.png": avatarXiaoMeiTu,
  "小熊.png": avatarXiaoXiong,
  "王小明.png": avatarWangXiaoMing,
};

// 預設頭像
const DEFAULT_AVATAR = avatarYouyou;

/**
 * 根據使用者名稱獲取對應的頭像
 * @param {string} userImgKey - 使用者頭像的 key（如 "悠悠.png"）
 * @returns {string} 頭像圖片路徑
 */
export function getUserAvatar(userImgKey) {
  return AVATAR_MAP[userImgKey] || DEFAULT_AVATAR;
}

/**
 * 獲取所有可用的頭像列表
 * @returns {Array} 頭像列表
 */
export function getAllAvatars() {
  return Object.entries(AVATAR_MAP).map(([key, src]) => ({
    key,
    src,
    name: key.replace(".png", ""),
  }));
}

// 匯出頭像資源
export { AVATAR_MAP, DEFAULT_AVATAR };
