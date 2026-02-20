import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import FrontLayout from "./components/layout/FrontLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import { ROUTES } from "./constants/routes";
import { useSelector, useDispatch } from "react-redux";
// import { authStore } from "./services/auth/authStore.js";
import usePlayRule from "./slices/playRule.js";

// Slice
import { setPlaylist, toggle } from "./slices/playerSlice";
import { fetchAllLikes } from "./slices/userLikeSlice";
import { fetchAllFollowers } from "./slices/playlistFollowSlice";
import { fetchPlaylists } from "./slices/memberPlaylistSlice";

// 前台 pages
import ScrollToTop from "./helpers/ScrollToTop.jsx";
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
import PlaylistRoute from "./pages/playlist/PlaylistRoute.jsx";
import SubscriptionManagement from "./pages/subscription/SubscriptionManagement";

// 後台 pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";

function App() {
  const dispatch = useDispatch();
  const guardPlay = usePlayRule();
  useEffect(() => {
    dispatch(fetchPlaylists());
    dispatch(fetchAllFollowers());
    dispatch(fetchAllLikes());
  }, [dispatch]);

  const playlists = useSelector((state) => state.playlists.playlists);

  const { currentIndex, currentListId } = useSelector((state) => state.player);
  // const canPlayIndex = (index, plan) => {
  //   if (plan === "pro") return true;
  //   return index < 3;
  // };

  // const selectPlaylist = (listID, index = 0) => {
  //   const list = playlists.find((l) => l.id === listID);
  //   if (!list) return;

  //   const plan = authStore.getUserPlan();
  //   if (!canPlayIndex(index, plan)) {
  //     const confirmed = window.confirm("這份陪伴暫僅開放前三首試聽，升級訂閱即可完整聆聽。");
  //     if (confirmed) navigate("/subscription");
  //     return;
  //   }

  //   const isSameSong = currentListId === listID && currentIndex === index;

  //   if (isSameSong) {
  //     dispatch(toggle());
  //     return;
  //   }

  //   dispatch(
  //     setPlaylist({
  //       songList: list.songs,
  //       startIndex: index,
  //       listId: listID,
  //     })
  //   );
  // };

  const selectPlaylist = (listID, index = 0) => {
    const list = playlists.find((l) => l.id === listID);
    if (!list) return;
    if (!guardPlay(index)) return;
    const isSameSong = currentListId === listID && currentIndex === index;
    if (isSameSong) {
      dispatch(toggle());
      return;
    }
    dispatch(
      setPlaylist({
        songList: list.songs,
        startIndex: index,
        listId: listID,
      })
    );
  };

  const songList = useSelector((state) => state.player.songList);
  return (
    <>
      <ScrollToTop />
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
            <Route path=":id" element={<SinglePlaylist selectPlaylist={selectPlaylist} />} />
          </Route>
          <Route path="subscription" element={<Subscription />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="/member" element={<MemberPage selectPlaylist={selectPlaylist} />}>
            <Route path=":id" element={<SinglePlaylist />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/member-account-edit" element={<MemberAccountEdit />} />
          <Route path="/member/subscription" element={<SubscriptionManagement />} />
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

      {!songList.length ? <BackToTop /> : <Player />}
    </>
  );
}

export default App;
