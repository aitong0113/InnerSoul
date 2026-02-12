import api from "../api";
import { authStore } from "./authStore";

/**
 * 登入
 * @param {{ email: string, password: string }} data
 */
export async function login(data) {
  try {
    const res = await api.post("/login", data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

/**
 * 註冊
 * @param {{ userName:string, email: string, password: string }} data
 */
export async function signUp(data) {
  try {
    const res = await api.post("/signup", data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

/**
 * 修改密碼
 */
export async function updatePassword(userId, newPassword) {
  try {
    const res = await api.patch(`/600/users/${userId}`, {
      password: newPassword,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}

/**
 * 登出
 */
export function logout() {
  authStore.clear();
}
