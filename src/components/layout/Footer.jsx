import logo from "../../assets/logo.png";
import cloudLeft from "../../assets/cloud-left.svg";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export default function Footer() {
  return (
    <footer className="bg-BG-02 pt-5 site-footer">
      {/* 左下雲（裝飾） */}
      <img src={cloudLeft} className="footer-cloud-left" alt="" />

      <div className="text-center">
        <div className="container pb-8">
          <div className="text-center">
            <img src={logo} alt="Inner Soul" className="mb-3" style={{ height: "80px" }} />

            <ul className="d-flex justify-content-center gap-8 pt-4 footer-nav">
              <li className="list-inline-item mx-2">
                <Link to={ROUTES.playlist} className="text-black-700">
                  語音陪伴
                </Link>
              </li>
              <li className="list-inline-item mx-2">
                <Link to={ROUTES.diaryBase} className="text-black-700">
                  心情日記
                </Link>
              </li>
              <li className="list-inline-item mx-2">
                <Link to={ROUTES.faq} className="text-black-700">
                  常見問題
                </Link>
              </li>
              <li className="list-inline-item mx-2">
                <Link to={ROUTES.subscription} className="text-black-700">
                  訂閱方案
                </Link>
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
