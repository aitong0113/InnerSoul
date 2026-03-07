import logo from "../../assets/logo.png";
import cloudLeft from "../../assets/cloud-left.svg";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-BG-02 site-footer">
      {/* 左下雲（裝飾） */}
      <img src={cloudLeft} className="footer-cloud-left" alt="" />

      <div className="text-center">
        <div className="container py-lg-9 py-7">
          <div className="text-center">
            <img
              src={logo}
              alt="Inner Soul"
              className="footer-logo mb-lg-8 mb-6"
              style={{ height: "80px" }}
            />

            <ul className="d-flex justify-content-center gap-lg-6 gap-2 mb-lg-9 mb-8 footer-nav ps-0 fs-lg-5 fs-6">
              <li className="list-inline-item">
                <NavLink
                  to={ROUTES.playlist}
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  語音陪伴
                </NavLink>
              </li>
              <li className="list-inline-item">
                <NavLink
                  to={ROUTES.diaryBase}
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  心情日記
                </NavLink>
              </li>
              <li className="list-inline-item">
                <NavLink
                  to={ROUTES.faq}
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  常見問題
                </NavLink>
              </li>
              <li className="list-inline-item">
                <NavLink
                  to={ROUTES.subscription}
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  訂閱方案
                </NavLink>
              </li>
            </ul>

            <p className="footer-copy mb-0 text-primary-05">
              © 2026 Inner soul 心途｜溫柔陪你走一段路
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
