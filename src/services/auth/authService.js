import api from "../api";

/**
 * 登入
 * @param {{ email: string, password: string }} data
 */
export const login = (data) => {
  return api.post("/login", data);
};

/**
 * 註冊
 * @param {{ email: string, password: string }} data
 */
export const signUp = (data) => {
  return api.post("/signup", data);
};

/**
 * 登出（有些後端會需要）
 */
export const logout = () => {
  return api.post("/logout");
};
