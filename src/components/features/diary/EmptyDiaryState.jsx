import { Link } from "react-router-dom";

export default function EmptyDiaryState({ to }) {
  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="text-black-500 fs-5 text-center my-5 p-5">\ 這天的心情，還在等你留下 /</div>
      <div className="d-flex justify-content-center">
        <Link to={to} className="btn btn-primary-05 px-5">
          新增日記
        </Link>
      </div>
    </div>
  );
}
