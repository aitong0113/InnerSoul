import { Outlet } from "react-router-dom";
import { authStore } from "../../services/auth/authStore";
import DiaryWelcome from "./DiaryWelcome";

export default function Diary() {
  const isLoggedIn = authStore.isLoggedIn();

  if (!isLoggedIn) {
    return <DiaryWelcome />;
  }

  return <Outlet />;
}
