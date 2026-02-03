import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontLayout from "./components/layout/FrontLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import { ROUTES } from "./constants/routes";

// 前台 pages
import BackToTop from "./components/common/BackToTop/BackToTop";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Diary from "./pages/diary/Diary";
import Playlist from "./pages/playlist/Playlist";
import Subscription from "./pages/subscription/Subscription";
import Player from "./components/features/player/Player";
import listData from "./data/listData";
import mediaData from "./data/mediaData";
import { useMemo, useState } from "react";
import FAQPage from "./pages/faq/faq";
import NotFound from "./pages/not-found/NotFound";
import MemberPage from "./pages/Member/MemberPage";

// 後台 pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";

function App() {
  // 播放清單（給 Player 用）
  const [songList, setSongList] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  // 讓頁面可以用 listID 抓歌
  const mediaMap = useMemo(() => {
    const map = new Map();
    mediaData.forEach((s) => map.set(s.id, s));
    return map;
  }, []);

  const selectPlaylist = (listID, index = 0) => {
    const list = listData.find((p) => p.listID === listID);
    if (!list) return;

    const songs = list.songsID.map((id) => mediaMap.get(id)).filter(Boolean);
    setSongList(songs);
    setStartIndex(index);
  };
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* 前台 */}
        <Route path="/" element={<FrontLayout />}>
          <Route index element={<Home selectPlaylist={selectPlaylist} />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="diary" element={<Diary />} />
          <Route path="playlist" element={<Playlist selectPlaylist={selectPlaylist} />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="member" element={<MemberPage />} />
        </Route>

        {/* 後台 */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {songList === null ? <BackToTop /> : <Player songList={songList} startIndex={startIndex} />}
    </BrowserRouter>
  );
}

export default App;
