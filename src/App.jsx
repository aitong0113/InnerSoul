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

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Header />
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.signup} element={<SignUp />} />
        <Route path={ROUTES.diary} element={<Diary />} />
        <Route path={ROUTES.playlist} element={<Playlist />} />
      </Routes>

      <footer className="site-footer">
        <Footer />
      </footer>
      <BackToTop />
    </BrowserRouter>
  );
}

export default App;
