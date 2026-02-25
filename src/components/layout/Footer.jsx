import logo from "../../assets/logo.png";
import cloudLeft from "../../assets/cloud-left.svg";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-BG-02 pt-5 site-footer">
      {/* 左下雲（裝飾） */}
      <img src={cloudLeft} className="footer-cloud-left" alt="" />

      <div className="text-center">
        <div className="container py-11">
          <div className="text-center">
            <img src={logo} alt="Inner Soul" className="mb-3" style={{ height: "80px" }} />

            <ul className="d-flex justify-content-center gap-8 pt-4 footer-nav">
              <li className="list-inline-item mx-2">
                <NavLink
                  to={ROUTES.playlist}
                  className={({ isActive }) => (isActive ? "footer-link active" : "footer-link")}
                >
                  語音陪伴
                </NavLink>
              </li>
              <li className="list-inline-item mx-2">
                <NavLink
                  to={ROUTES.diaryBase}
                  className={({ isActive }) => (isActive ? "footer-link active" : "footer-link")}
                >
                  心情日記
                </NavLink>
              </li>
              <li className="list-inline-item mx-2">
                <NavLink
                  to={ROUTES.faq}
                  className={({ isActive }) => (isActive ? "footer-link active" : "footer-link")}
                >
                  常見問題
                </NavLink>
              </li>
              <li className="list-inline-item mx-2">
                <NavLink
                  to={ROUTES.subscription}
                  className={({ isActive }) => (isActive ? "footer-link active" : "footer-link")}
                >
                  訂閱方案
                </NavLink>
              </li>
            </ul>

            <p className="footer-copy mt-3 pt-4 text-primary-05">
              © 2026 Inner soul 心途｜溫柔陪你走一段路
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
