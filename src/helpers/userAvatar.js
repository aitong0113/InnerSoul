// 統一管理使用者頭像資源
import avatarAdmin from "../assets/img/userImg/avatar-admin.png";
import avatarYouyou from "../assets/img/userImg/avatar-premium.png";
import avatarXiaoTu from "../assets/img/userImg/avatar-rabbit.png";
import avatarXiaoMeiTu from "../assets/img/userImg/avatar-girl.png";
import avatarXiaoXiong from "../assets/img/userImg/avatar-bear.png";
import avatarWangXiaoMing from "../assets/img/userImg/avatar-wang.png";

// 頭像映射表
const AVATAR_MAP = {
  "avatar-admin.png": avatarAdmin,
  "avatar-premium.png": avatarYouyou,
  "avatar-rabbit.png": avatarXiaoTu,
  "avatar-girl.png": avatarXiaoMeiTu,
  "avatar-bear.png": avatarXiaoXiong,
  "avatar-wang.png": avatarWangXiaoMing,
};

// 預設頭像
const DEFAULT_AVATAR = avatarYouyou;

/**
 * 根據使用者名稱獲取對應的頭像
 * @param {string} userImgKey - 使用者頭像的 key（如 "avatar-premium.png"）
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
