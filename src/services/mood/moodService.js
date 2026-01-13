import api from "../api";

/**
 * 取得心情文字
 */
export const getMoodText = () => {
  return api.get("/mood");
};
