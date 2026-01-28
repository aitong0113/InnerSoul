import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { logout } from "../../services/auth/authService";
import { authStore } from "../../services/auth/authStore";

import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const isLoggedIn = authStore.isLoggedIn();
  const userName = authStore.getUserName();
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
              <span className="user-greeting">
                <Link
                  to="/member"
                  className="member-link"
                  aria-label="前往會員中心"
                  title="會員中心"
                  style={{ marginLeft: "8px" }}
                >
                  <i className="bi bi-house-heart-fill"></i>

                你好! {userName}
                </Link>
              </span>
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
