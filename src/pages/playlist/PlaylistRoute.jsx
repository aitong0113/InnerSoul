import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import { authStore } from "../../services/auth/authStore.js";

import "./playlist.scss";
import Button from "../../components/common/Button/Button.jsx";

function PlaylistRoute() {
  const navigate = useNavigate();
  const { keyword, lists } = useOutletContext();

  const location = useLocation();
  const isMemberPage = location.pathname.startsWith("/member");
  const userId = authStore.getUserId();

  const result = lists.filter((list) => {
    const matchKeyword = keyword ? list.listName.includes(keyword) : true;
    const matchOwner = isMemberPage ? list.ownerID === userId : true;
    return matchKeyword && matchOwner;
  });

  return (
    <>
      <section>
        <div className="container py-11">
          <ul className="d-flex">
            {result
              .filter((item) => item.ownerID === 2)
              .slice(0, 4)
              .map((item) => (
                <li key={item.id} style={{ listStyle: "none" }}>
                  <Button
                    text={item.listName}
                    type="button"
                    imgUrl="/Union.png"
                    onClick={() => navigate(`/playlist/${item.id}`)}
                  ></Button>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default PlaylistRoute;
