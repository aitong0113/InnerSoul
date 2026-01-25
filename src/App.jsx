import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
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

function App() {
  // 播放清單（給 Player 用）
  const [songList, setSongList] = useState(null);

  // 讓頁面可以用 listID 抓歌
  const mediaMap = useMemo(() => {
    const map = new Map();
    mediaData.forEach((s) => map.set(s.id, s));
    return map;
  }, []);

  const selectPlaylist = (listID) => {
    const list = listData.find((p) => p.listID === listID);
    if (!list) return;

    const songs = list.songsID.map((id) => mediaMap.get(id)).filter(Boolean);
    setSongList(songs);
  };
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Header />
      <Routes>
        <Route path={ROUTES.home} element={<Home selectPlaylist={selectPlaylist} />} />
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.signup} element={<SignUp />} />
        <Route path={ROUTES.diary} element={<Diary />} />
        <Route path={ROUTES.playlist} element={<Playlist selectPlaylist={selectPlaylist} />} />
        <Route path={ROUTES.subscription} element={<Subscription />} />
        <Route path={ROUTES.faq} element={<FAQPage />} />
      </Routes>

      <footer className="site-footer">
        <Footer />
      </footer>
      {songList === null ? <BackToTop /> : <Player songList={songList} />}
    </BrowserRouter>
  );
}

export default App;
