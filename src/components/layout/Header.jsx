import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { logout } from "../../services/auth/authService";
import { authStore } from "../../services/auth/authStore";
import UserProfile from "../shared/UserProfile";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

import logo from "../../assets/img/logo.png";
import { useEffect, useState } from "react";
import "../../assets/style/layout/_header.scss";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const [userPlan, setUserPlan] = useState(authStore.getUserPlan());
  const [isLoggedIn, setIsLoggedIn] = useState(authStore.isLoggedIn());

  // 控制行動版選單的狀態
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

  async function handleLogout() {
    const result = await Swal.fire({
      icon: "warning",
      title: "確定要登出嗎？",
      text: "登出後需要重新登入才能使用完整功能",
      confirmButtonText: "登出",
      cancelButtonText: "取消",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    logout();
    setIsMobileMenuOpen(false);
    window.dispatchEvent(new Event("auth-update"));
    await Swal.fire({
      icon: "success",
      title: "已登出",
      timer: 1200,
      showConfirmButton: false,
    });

    navigate("/");
  }

  // 點擊連結時自動收合選單的輔助函式
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <Link to={ROUTES.home} className="site-logo" onClick={closeMenu}>
          <img src={logo} alt="Inner Soul" className="site-logo" />
        </Link>

        {/* 行動版漢堡按鈕 */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <IconX size={32} /> : <IconMenu2 size={32} />}
        </button>

        {/* 半透明黑色遮罩 */}
        <div className={`menu-overlay ${isMobileMenuOpen ? "open" : ""}`} onClick={closeMenu}></div>

        <div className={`nav-wrapper ${isMobileMenuOpen ? "open" : ""}`}>
          <nav className="main-nav fs-5">
            <NavLink
              to={ROUTES.playlist}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              onClick={closeMenu}
            >
              語音陪伴
            </NavLink>
            <NavLink
              to={ROUTES.diaryBase}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              onClick={closeMenu}
            >
              心情日記
            </NavLink>
            <NavLink
              to={ROUTES.faq}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              onClick={closeMenu}
            >
              常見問題
            </NavLink>
            <NavLink
              to={ROUTES.subscription}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              onClick={closeMenu}
            >
              訂閱方案
            </NavLink>
          </nav>

          {/* 登入註冊 */}
          <div className="auth-buttons">
            {isLoggedIn ? (
              <>
                {/* 升級方案按鈕（僅免費會員顯示，且手機版隱藏） */}
                {(!userPlan || userPlan === "free") && (
                  <NavLink
                    to="/member/subscription"
                    className="btn custom-btn-outline desktop-only"
                    onClick={closeMenu}
                    style={{ fontSize: "14px" }}
                  >
                    升級方案
                  </NavLink>
                )}

                {/* 使用者資訊 */}
                <NavLink
                  to="/member"
                  className="member-link"
                  aria-label="前往會員中心"
                  title="會員中心"
                  onClick={closeMenu}
                >
                  <UserProfile variant="header" />
                </NavLink>

                {/* 登出按鈕：桌機版顯示 Icon，手機版顯示文字 */}
                <button className="btn btn-outline logout-btn border-0" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right desktop-only"></i>
                  <span className="mobile-only">登出</span>
                </button>
              </>
            ) : (
              <>
                {/* 桌機版：顯示分開的登入與註冊 */}
                <Link
                  to={ROUTES.login}
                  className="btn custom-btn-text desktop-only"
                  onClick={closeMenu}
                >
                  登入
                </Link>
                <Link
                  to={ROUTES.signup}
                  className="btn custom-btn-text desktop-only"
                  onClick={closeMenu}
                >
                  註冊
                </Link>

                {/* 手機版：顯示合併的 登入/註冊 按鈕 */}
                <Link
                  to={ROUTES.login}
                  className="btn btn-primary mobile-login-btn mobile-only"
                  onClick={closeMenu}
                >
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
