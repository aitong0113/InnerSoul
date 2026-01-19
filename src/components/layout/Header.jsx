import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { logout } from "../../services/auth/authService";

import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const token = localStorage.getItem("accessToken");
  const userName = localStorage.getItem("userName");
  const isLoggedIn = !!token;
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

        {/* 主選單 */}
        <nav className="main-nav">
          <Link to={ROUTES.playlist} className="nav-link">
            語音陪伴
          </Link>
          <Link to={ROUTES.diaryBase} className="nav-link">
            心情日記
          </Link>
          <a href="#">常見問題</a>
          <a href="#">訂閱方案</a>
        </nav>

        {/* 登入註冊 */}
        <div className="auth-buttons">
          {isLoggedIn ? (
            <>
              <span>你好! {userName}</span>
              <button className="btn btn-outline" onClick={handleLogout}>
                登出
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
