import { Routes, Route, HashRouter } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import FrontLayout from "./components/layout/FrontLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import { ROUTES } from "./constants/routes";
import api from "./services/api.js";
import { useSelector, useDispatch } from "react-redux";
import { authStore } from "./services/auth/authStore.js";
// Slice
import { setPlaylist, toggle } from "./slices/playerSlice";
import { fetchLikedSongs } from "./slices/userLikeSlice";

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
import MemberAccountEdit from "./pages/Member/MemberAccountEdit";

// 後台 pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import PlaylistRoute from "./pages/playlist/PlaylistRoute.jsx";
import PlaylistView from "./pages/playlist/PlaylistView.jsx";

function App() {
  const dispatch = useDispatch();
  const userId = authStore.getUserId();
  useEffect(() => {
    if (userId) {
      dispatch(fetchLikedSongs(userId));
    }
  }, [userId, dispatch]);

  const { currentIndex, currentListId } = useSelector((state) => state.player);
  const [lists, setLists] = useState([]);
  const [songs, setSongs] = useState([]);
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
  const canPlayIndex = (index, plan) => {
    if (plan === "pro") return true;
    return index < 3;
  };

  const selectPlaylist = (listID, index = 0) => {
    const list = lists.find((l) => l.id === listID);
    if (!list) return;
    const plan = authStore.getUserPlan();
    if (!canPlayIndex(index, plan)) {
      alert("請升級付費");
      return;
    }
    const isSameSong = currentListId === listID && currentIndex === index;
    // 點同一首歌：只 toggle
    if (isSameSong) {
      dispatch(toggle());
      return;
    }
    // 點不同歌：切歌 + 播放
    const songsInList = list.songsID.map((id) => mediaMap.get(id)).filter(Boolean);
    dispatch(
      setPlaylist({
        songList: songsInList,
        startIndex: index,
        listId: listID,
      })
    );
  };

  const songList = useSelector((state) => state.player.songList);
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
          <Route path="playlist" element={<PlaylistLayout selectPlaylist={selectPlaylist} />}>
            <Route index element={<Playlist />} />
            <Route
              path=":id"
              element={
                <SinglePlaylist lists={lists} songs={songs} selectPlaylist={selectPlaylist} />
              }
            />
          </Route>
          <Route path="subscription" element={<Subscription />} />
          <Route path="faq" element={<FAQPage />} />
          <Route
            path="/member"
            lists={lists}
            songs={songs}
            element={<MemberPage selectPlaylist={selectPlaylist} />}
          >
            <Route path=":id" element={<SinglePlaylist />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/member-account-edit" element={<MemberAccountEdit />} />
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
      {/* {songList === null ? <BackToTop /> : <PlayerContainer />} */}

      {!songList.length ? <BackToTop /> : <Player />}
    </HashRouter>
  );
}

export default App;
