import { Link } from "react-router-dom";
import style from "./diaryState.module.scss";

export default function SubscribeNotice({ to }) {
  return (
    <div
      className={`${style.desktopMargin} d-flex flex-column  flex-grow-1 justify-content-center align-items-center`}
    >
      <div className="text-black-500 fs-6 fs-md-5 text-center my-5 p-5">
        \ 已達日記使用上限，請前往訂閱 /
      </div>
      <div className="d-flex justify-content-center">
        <Link to={to} className={`custom-btn-filled fw-bold py-2 px-4`}>
          <span className="px-5">訂閱心途</span>
        </Link>
      </div>
    </div>
  );
}
