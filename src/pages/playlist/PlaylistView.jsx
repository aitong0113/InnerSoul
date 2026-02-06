import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authStore } from "../../services/auth/authStore.js";
import api from "../../services/api.js";

import "./playlist.scss";
import Button from "../../components/common/Button/Button.jsx";

function PlaylistView() {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);

  const location = useLocation();
  const isMemberPage = location.pathname.startsWith("/member");
  const userId = authStore.getUserId();

  useEffect(() => {
    api.get(`/lists`).then((res) => {
      setLists(res.data);
    });
  }, []);

  const result = lists.filter((list) => {
    const matchOwner = isMemberPage ? list.ownerID === userId : true;
    return matchOwner;
  });

  return (
    <>
      <section>
        <div className="container py-11">
          <ul className="d-flex">
            {result.map((item) => (
              <li key={item.id} style={{ listStyle: "none" }}>
                <Button
                  text={item.listName}
                  type="button"
                  imgUrl="/Union.png"
                  onClick={() => navigate(`/member/${item.id}`)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default PlaylistView;
