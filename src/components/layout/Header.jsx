import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { logout } from "../../services/auth/authService";
import { authStore } from "../../services/auth/authStore";

import logo from "../../assets/logo.png";
import avatarYouyou from "../../assets/userImg/悠悠.png";
import { useEffect, useState } from "react";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const isLoggedIn = authStore.isLoggedIn();
  const userName = authStore.getUserName();

  const userImgKey = localStorage.getItem("userImg");

  const avatarMap = {
    "悠悠.png": avatarYouyou,
  };

  const avatarSrc = avatarMap[userImgKey] || avatarYouyou;

  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleLogout() {
    logout();
    navigate(0);
  }

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        {/* LOGO */}
        <Link to={ROUTES.home} className="site-logo">
          <img src={logo} alt="Inner Soul" className="site-logo" />
        </Link>
        <nav className="main-nav">
          <Link to={ROUTES.playlist} className="nav-link">
            語音陪伴
          </Link>

          <Link to={ROUTES.diaryBase} className="nav-link">
            心情日記
          </Link>

          <Link to={ROUTES.faq} className="nav-link">
            常見問題
          </Link>

          <Link to={ROUTES.subscription} className="nav-link">
            訂閱方案
          </Link>
        </nav>

        {/* 登入註冊 */}
        <div className="auth-buttons">
          {isLoggedIn ? (
            <>
              <Link
                to="/member"
                className="member-link member-profile"
                aria-label="前往會員中心"
                title="會員中心"
              >
                <img
                  className="member-avatar"
                  src={avatarSrc}
                  alt={`${userName || "會員"} 的頭像`}
                />
                <span className="member-name">{userName || "會員"}</span>
              </Link>
              <button className="btn btn-outline" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </>
          ) : (
            <>
              <Link to={ROUTES.login} className="btn btn-outline">
                登入
              </Link>
              <Link to={ROUTES.signup} className="btn btn-outline">
                註冊
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
