import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { authStore } from "../../services/auth/authStore";
import PlaylistRecommend from "./PlaylistRecommend";
import api from "../../services/api.js";
import { useSelector } from "react-redux";
import { IconArrowBackUp } from "@tabler/icons-react";

function PlaylistLayout({ selectPlaylist }) {
  const { currentListId, isPlaying } = useSelector((state) => state.player);
  const plan = authStore.getUserPlan();
  const navigate = useNavigate();
  const location = useLocation();
  const isSubPage = location.pathname !== "/playlist";

  const [lists, setLists] = useState([]);
  useEffect(() => {
    api.get(`/lists`).then((res) => {
      setLists(res.data);
    });
  }, []);
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");
  return (
    <>
      <div className="container py-11">
        <h2 className="text-primary-05 fw-bold mb-9">你的心，正在播放哪一段旋律？</h2>

        <input
          value={inputValue}
          className="mb-6 p-2 border rounded-2"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setKeyword(inputValue);
              setInputValue("");
              if (location.pathname !== "/playlist") {
                navigate("/playlist");
              }
            }
          }}
          placeholder="搜尋歌單"
        />
        {isSubPage && (
          <button
            className="btn border-0 ms-2"
            aria-label="上一頁"
            title="上一頁"
            onClick={() => navigate(-1)}
          >
            <IconArrowBackUp size={28} className="text-secondary" />
          </button>
        )}
      </div>
      <Outlet context={{ plan, keyword, lists, selectPlaylist }} />
      <PlaylistRecommend
        lists={lists}
        selectPlaylist={selectPlaylist}
        isPlaying={isPlaying}
        currentListId={currentListId}
      />
    </>
  );
}

export default PlaylistLayout;
