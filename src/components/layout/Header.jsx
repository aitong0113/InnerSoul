import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { logout } from "../../services/auth/authService";
import { authStore } from "../../services/auth/authStore";
import UserProfile from "../shared/UserProfile";
import { IconSparkles, IconMenu2, IconX } from "@tabler/icons-react";

import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import "../../assets/layout/_header.scss";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const [userPlan, setUserPlan] = useState(authStore.getUserPlan());
  const [isLoggedIn, setIsLoggedIn] = useState(authStore.isLoggedIn());

  // ✨ 2. 新增控制行動版選單的狀態
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleAuthUpdate = () => {
      setUserPlan(authStore.getUserPlan());
      setIsLoggedIn(authStore.isLoggedIn());
    };
    window.addEventListener("auth-update", handleAuthUpdate);

    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("auth-update", handleAuthUpdate);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function handleLogout() {
    logout();
    window.dispatchEvent(new Event("auth-update"));
    setIsMobileMenuOpen(false); // 登出時關閉選單
    navigate(0);
  }

  // ✨ 3. 點擊連結時自動收合選單的輔助函式
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <Link to={ROUTES.home} className="site-logo" onClick={closeMenu}>
          <img src={logo} alt="Inner Soul" className="site-logo" />
        </Link>

        {/* ✨ 4. 行動版漢堡按鈕 (桌機版會用 CSS 隱藏) */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <IconX size={32} /> : <IconMenu2 size={32} />}
        </button>

        {/* ✨ 新增：半透明黑色遮罩，並綁定 onClick={closeMenu} 讓點擊背景可以關閉選單 */}
        <div
          className={`menu-overlay ${isMobileMenuOpen ? "open" : ""}`}
          onClick={closeMenu}
        ></div>

        {/* ✨ 5. 用一個 wrapper 包住主要選單跟按鈕，方便用 CSS 做手機版展開 */}
        <div className={`nav-wrapper ${isMobileMenuOpen ? "open" : ""}`}>
          <nav className="main-nav">
            <Link to={ROUTES.playlist} className="nav-link" onClick={closeMenu}>
              語音陪伴
            </Link>
            <Link to={ROUTES.diaryBase} className="nav-link" onClick={closeMenu}>
              心情日記
            </Link>
            <Link to={ROUTES.faq} className="nav-link" onClick={closeMenu}>
              常見問題
            </Link>
            <Link to={ROUTES.subscription} className="nav-link" onClick={closeMenu}>
              訂閱方案
            </Link>
          </nav>

          {/* 登入註冊 */}
          <div className="auth-buttons">
            {isLoggedIn ? (
              <>
                {/* 升級方案按鈕（僅免費會員顯示，且手機版隱藏） */}
                {(!userPlan || userPlan === "free") && (
                  <Link to="/member/subscription" className="upgrade-btn desktop-only" onClick={closeMenu}>
                    升級方案
                  </Link>
                )}

                {/* 使用者資訊 */}
                <Link to="/member" className="member-link" aria-label="前往會員中心" title="會員中心" onClick={closeMenu}>
                  <UserProfile variant="header" />
                </Link>

                {/* 登出按鈕：桌機版顯示 Icon，手機版顯示文字 */}
                <button className="btn btn-outline logout-btn" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right desktop-only"></i>
                  <span className="mobile-only">登出</span>
                </button>
              </>
            ) : (
              <>
                {/* 桌機版：顯示分開的登入與註冊 */}
                <Link to={ROUTES.login} className="btn btn-outline desktop-only" onClick={closeMenu}>
                  登入
                </Link>
                <Link to={ROUTES.signup} className="btn btn-outline desktop-only" onClick={closeMenu}>
                  註冊
                </Link>

                {/* 手機版：顯示合併的 登入/註冊 按鈕 */}
                <Link to={ROUTES.login} className="btn btn-primary mobile-login-btn mobile-only" onClick={closeMenu}>
                  登入/註冊
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
