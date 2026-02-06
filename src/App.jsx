import { Routes, Route, HashRouter } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import FrontLayout from "./components/layout/FrontLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import { ROUTES } from "./constants/routes";
import api from "./services/api.js";

// 前台 pages
import BackToTop from "./components/common/BackToTop/BackToTop";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Diary from "./pages/diary/Diary";
import DiaryHome from "./pages/diary/DiaryHome";
import EditDiary from "./components/features/diary/EditDiary";
import Playlist from "./pages/playlist/PlaylistRoute.jsx";
import Subscription from "./pages/subscription/Subscription";
import Player from "./components/features/player/Player";
import FAQPage from "./pages/faq/faq";
import NotFound from "./pages/not-found/NotFound";
import MemberPage from "./pages/Member/MemberPage";
import SinglePlaylist from "./pages/playlist/SinglePlaylist";
import Checkout from "./pages/checkout/Checkout";
import PlaylistLayout from "./pages/playlist/PlaylistLayout";

// 後台 pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import PlaylistRoute from "./pages/playlist/PlaylistRoute.jsx";
import PlaylistView from "./pages/playlist/PlaylistView.jsx";

function App() {
  const [lists, setLists] = useState([]);
  const [songs, setSongs] = useState([]);
  // 播放清單（給 Player 用）
  const [songList, setSongList] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [playTrigger, setPlayTrigger] = useState(0);
  // 播放狀態
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentListId, setCurrentListId] = useState(null);
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
        const [listsRes, songsRes] = await Promise.all([api.get(`/lists`), api.get(`/songs`)]);
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
    setCurrentListId(listID);
    setPlayTrigger((n) => n + 1);
  };

  return (
    <HashRouter>
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
          <Route
            path="playlist"
            element={
              <PlaylistLayout
                selectPlaylist={selectPlaylist}
                currentListId={currentListId}
                isPlaying={isPlaying}
              />
            }
          >
            <Route index element={<Playlist />} />
            <Route
              path=":id"
              element={
                <SinglePlaylist
                  lists={lists}
                  songs={songs}
                  selectPlaylist={selectPlaylist}
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                />
              }
            />
          </Route>
          <Route path="subscription" element={<Subscription />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="/member" element={<MemberPage />}>
            <Route path=":id" element={<SinglePlaylist />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
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
      {songList === null ? (
        <BackToTop />
      ) : (
        <Player
          songList={songList}
          startIndex={startIndex}
          setStartIndex={setStartIndex}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          playTrigger={playTrigger}
        />
      )}
    </HashRouter>
  );
}

export default App;
