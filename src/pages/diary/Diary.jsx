import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import DiaryHome from "./DiaryHome";
import EditDiary from "../../components/features/diary/EditDiary";
import { authStore } from "../../services/auth/authStore";

export default function Diary() {
  const [isLoggedIn, setIsLoggedIn] = useState(authStore.isLoggedIn());

  useEffect(() => {
    setIsLoggedIn(authStore.isLoggedIn());
  }, []);

  if (!isLoggedIn) {
    return <div>未登入的日記頁</div>;
  }

  return (
    <Routes>
      <Route index element={<DiaryHome />} />
      <Route path="edit" element={<EditDiary />} />
      <Route path="edit/:date" element={<EditDiary />} />
    </Routes>
  );
}
