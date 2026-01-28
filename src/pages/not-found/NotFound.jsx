import { Link } from "react-router-dom";
import "./not-found.scss";
import notFoundSvg from "../../assets/404.svg";

export default function NotFound() {
  return (
    <main className="bg-BG-01 bg-liner not-found-page">
      <div className="not-found-flow">
        <div className="not-found-content">

          <img
            src={notFoundSvg}
            alt="404 找不到頁面"
            className="not-found-illustration"
          />

          <h1 className="not-found-title">404</h1>
          <p className="not-found-text">
            抱歉，你所尋找的頁面不存在或已被移除。
          </p>
          <Link to="/" className="not-found-link">
            返回首頁
          </Link>

        </div>
      </div>
    </main>
  );
}