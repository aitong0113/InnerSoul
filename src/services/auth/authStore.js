import Cookies from "js-cookie";

const TOKEN_KEY = "accessToken";
const USER_ID_KEY = "userId";
const USER_NAME_KEY = "userName";

export const authStore = {
  setAuth({ accessToken, userId, userName, days = 3 }) {
    if (accessToken) Cookies.set(TOKEN_KEY, accessToken, { expires: days });
    if (userId !== null) Cookies.set(USER_ID_KEY, String(userId), { expires: days });
    if (userName) Cookies.set(USER_NAME_KEY, userName, { expires: days });
  },

  getToken() {
    return Cookies.get(TOKEN_KEY) || "";
  },

  getUserId() {
    return Cookies.get(USER_ID_KEY) || "";
  },

  getUserName() {
    return Cookies.get(USER_NAME_KEY) || "";
  },

  isLoggedIn() {
    return Boolean(this.getToken());
  },

  clear() {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(USER_ID_KEY);
    Cookies.remove(USER_NAME_KEY);
  },
};
