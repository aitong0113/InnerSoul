import { Link } from "react-router-dom";
import style from "../../../pages/diary/diaryWelcome.module.scss";

export default function EmptyDiaryState({ to }) {
  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="text-black-500 fs-5 text-center my-5 p-5">\ 這天的心情，還在等你留下 /</div>
      <div className="d-flex justify-content-center">
        <Link to={to}>
          <button type="button" className={`px-5 ${style.btnFilled}`}>
            <span className="px-5">新增日記</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
