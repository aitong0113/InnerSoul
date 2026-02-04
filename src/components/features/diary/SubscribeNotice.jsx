import { Link } from "react-router-dom";

export default function SubscribeNotice({ to }) {
  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="text-black-500 fs-5 text-center my-5 p-5">
        \ 已達日記使用上限，請前往訂閱 /
      </div>
      <div className="d-flex justify-content-center">
        <Link to={to} className="btn btn-primary-05 px-5">
          訂閱心途
        </Link>
      </div>
    </div>
  );
}
