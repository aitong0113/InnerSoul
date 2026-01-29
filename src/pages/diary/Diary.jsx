import { Routes, Route } from "react-router-dom";
import DiaryHome from "./DiaryHome";
import EditDiary from "../../components/features/diary/EditDiary";

export default function Diary() {
  const isLogin = Boolean(localStorage.getItem("accessToken"));

  if (!isLogin) {
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
