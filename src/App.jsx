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
import NotFound from "./pages/not-found/NotFound";
import MemberPage from "./pages/Member/MemberPage";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Header />
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.signup} element={<SignUp />} />
        <Route path={ROUTES.diary} element={<Diary />} />
        <Route path={ROUTES.playlist} element={<Playlist selectPlaylist={selectPlaylist} />} />
        <Route path={ROUTES.subscription} element={<Subscription />} />
        <Route path={ROUTES.faq} element={<FAQPage />} />
        <Route path="/member" element={<MemberPage />} />
        <Route path="*" element={<NotFound />} /> {/* 404 */}
      </Routes>

      <footer className="site-footer">
        <Footer />
      </footer>
      <BackToTop />
    </BrowserRouter>
  );
}

export default App;
