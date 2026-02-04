import { Outlet } from "react-router-dom";
import { authStore } from "../../services/auth/authStore";

export default function Diary() {
  const isLoggedIn = authStore.isLoggedIn();

  if (!isLoggedIn) {
    return <div>未登入的日記頁</div>;
  }

  return <Outlet />;
}
