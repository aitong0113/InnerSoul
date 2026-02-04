import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontLayout from "./components/layout/FrontLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import { ROUTES } from "./constants/routes";
import axios from "axios";

// 前台 pages
import BackToTop from "./components/common/BackToTop/BackToTop";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Diary from "./pages/diary/Diary";
import DiaryHome from "./pages/diary/DiaryHome";
import EditDiary from "./components/features/diary/EditDiary";
import Playlist from "./pages/playlist/Playlist";
import Subscription from "./pages/subscription/Subscription";
import Player from "./components/features/player/Player";
import { useMemo, useState, useEffect } from "react";
import FAQPage from "./pages/faq/faq";
import NotFound from "./pages/not-found/NotFound";
import MemberPage from "./pages/Member/MemberPage";
import SinglePlaylist from "./pages/playlist/SinglePlaylist";

// 後台 pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";

const API_BASE = "http://localhost:3001";

function App() {
  const [lists, setLists] = useState([]);
  const [songs, setSongs] = useState([]);
  // 播放清單（給 Player 用）
  const [songList, setSongList] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  // 讓頁面可以用 listID 抓歌
  const mediaMap = useMemo(() => {
    const map = new Map();
    songs.forEach((s) => map.set(s.id, s));
    return map;
  }, [songs]);

  // 抓資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listsRes, songsRes] = await Promise.all([
          axios.get(`${API_BASE}/lists`),
          axios.get(`${API_BASE}/songs`),
        ]);
        setLists(listsRes.data);
        setSongs(songsRes.data);
      } catch (error) {
        console.error("初始化資料失敗", error);
      }
    };
    fetchData();
  }, []);

  const selectPlaylist = (listID, index = 0) => {
    const list = lists.find((l) => l.id === listID);
    if (!list) return;
    const songsInList = list.songsID.map((id) => mediaMap.get(id)).filter(Boolean);
    setSongList(songsInList);
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
          <Route path="diary" element={<Diary />}>
            <Route index element={<DiaryHome />} />
            <Route path="edit" element={<EditDiary />} />
            <Route path="edit/:date" element={<EditDiary />} />
          </Route>
          <Route path="playlist" element={<Playlist />} />
          <Route
            path="playlist/:id"
            element={<SinglePlaylist lists={lists} songs={songs} selectPlaylist={selectPlaylist} />}
          />
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
