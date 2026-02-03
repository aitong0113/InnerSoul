import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/common/Button/Button";
import "./playlist.scss";
import PlaylistRecommend from "./PlaylistRecommend";

const API_BASE = "http://localhost:3001";

function PlaylistList() {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    axios.get(`${API_BASE}/lists`).then((res) => {
      setLists(res.data);
    });
  }, []);

  const result = lists.filter((list) => list.listName.includes(keyword));

  return (
    <>
      <section>
        <div className="container py-11">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜尋歌單"
          />

          <ul className="d-flex">
            {result.map((item) => (
              <Button
                key={item.id}
                text={item.listName}
                imgUrl="/Union.png"
                onClick={() => navigate(`/playlist/${item.id}`)}
              />
            ))}
          </ul>
        </div>
      </section>
      <PlaylistRecommend />
    </>
  );
}

export default PlaylistList;
