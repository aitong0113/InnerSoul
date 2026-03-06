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
    const matchOwner = isMemberPage ? list.ownerId === userId : true;
    return matchKeyword && matchOwner;
  });

  return (
    <>
      <section>
        <div className="container py-6 py-md-11">
          <ul className="d-flex row row-cols-sm-2 row-cols-md-4 ps-0">
            {result
              .filter((item) => item.ownerId === 2)
              .slice(0, 4)
              .map((item) => (
                <li
                  key={item.id}
                  style={{ listStyle: "none" }}
                  className="column d-flex justify-content-center"
                >
                  <Button
                    text={item.listName}
                    type="button"
                    imgUrl={`${import.meta.env.BASE_URL}Union.png`}
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
