import Cookies from "js-cookie";

const TOKEN_KEY = "accessToken";
const USER_ID_KEY = "userId";
const USER_NAME_KEY = "userName";
const USER_IMG_KEY = "userImg";
const USER_PLAN_KEY = "plan";

export const authStore = {
  setAuth({ accessToken, userId, userName, userImg, plan, days = 3 }) {
    if (accessToken) Cookies.set(TOKEN_KEY, accessToken, { expires: days });
    if (userId !== null && userId !== undefined)
      Cookies.set(USER_ID_KEY, String(userId), { expires: days });
    if (userName) Cookies.set(USER_NAME_KEY, userName, { expires: days });
    if (userImg) Cookies.set(USER_IMG_KEY, userImg, { expires: days });
    if (plan) Cookies.set(USER_PLAN_KEY, plan, { expires: days });
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

  getUserImg() {
    return Cookies.get(USER_IMG_KEY) || "";
  },

  getUserPlan() {
    return Cookies.get(USER_PLAN_KEY) || "";
  },

  isLoggedIn() {
    return Boolean(this.getToken());
  },

  clear() {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(USER_ID_KEY);
    Cookies.remove(USER_NAME_KEY);
    Cookies.remove(USER_IMG_KEY);
    Cookies.remove(USER_PLAN_KEY);
  },
};
