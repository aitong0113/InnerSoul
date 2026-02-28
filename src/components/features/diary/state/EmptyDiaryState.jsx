import { Link } from "react-router-dom";
import style from "./diaryState.module.scss";

export default function EmptyDiaryState({ to }) {
  return (
    <div
      className={`${style.desktopMargin} d-flex flex-column flex-grow-1 justify-content-center align-items-center`}
    >
      <div className="text-black-500 fs-6 fs-md-5 text-center my-5 p-5">
        \ 這天的心情，還在等你留下 /
      </div>
      <div className="d-flex justify-content-center">
        <Link to={to} className={`fw-bold custom-btn-filled py-2 px-4`}>
          <span className="px-5">新增日記</span>
        </Link>
      </div>
    </div>
  );
}
