import { useState } from "react";
import Button from "../../components/common/Button/Button";
import Player from "../../components/features/player/Player";
import "./playlist.scss";

function Playlist({ selectPlaylist }) {
  const [keyword, setKeyword] = useState("");
  return (
    <>
      <section>
        <div className="container py-11">
          <input
            type="text"
            placeholder="搜尋歌曲或情緒"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            // 按enter才搜尋
          />
          <div className="bg-playlist d-flex" style={{ borderRadius: "20px" }}>
            <div className="p-7">
              <Button text="孤獨" imgUrl="/Union.png" onClick={() => selectPlaylist(1)}></Button>
            </div>
            <div>
              <ul>
                {/* 取得清單資料，並渲染到畫面 */}
                <li onClick={() => selectPlaylist(7)}>在需要被理解的時刻 </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-liner">
        <div className="container py-11">
          <div className="row row-cols-2 row-cols-md-4 g-6 text-center ">
            <div className="col ">
              <div className="tag-playlist h-100 py-9 px-7 fw-bold text-primary-05 gap-3">
                <h5 className="mb-0">早晨精選</h5>
                <i className="bi bi-play-fill fs-3"></i>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </div>
        <div className="playlistCard bg-playlist"></div>
      </section>
      <div>
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            zIndex: "40",
            right: "20px",
          }}
        >
          {/* <Player></Player> */}
        </div>
      </div>
    </>
  );
}

export default Playlist;
