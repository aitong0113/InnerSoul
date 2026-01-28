import { useState } from "react";
import Button from "../../components/common/Button/Button";
import Player from "../../components/features/player/Player";
import "./playlist.scss";
import listData from "../../data/listData";

function Playlist({ selectPlaylist }) {
  const [keyword, setKeyword] = useState("");
  const [targetList, setTargetList] = useState({ listName: "", songsID: [] });
  const selectTargetList = (item) => {
    setTargetList(item);
  };
  const result = listData.filter((list) => list.listName.includes(keyword));
  return (
    <>
      <section>
        <div className="container py-11">
          <div className="bg-playlist " style={{ borderRadius: "20px" }}>
            <input
              type="text"
              className="mb-7"
              placeholder="搜尋歌曲或情緒"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              // 按enter才搜尋
            />
            <div>
              <ul className="d-flex">
                {result.map((item) => {
                  return (
                    <Button
                      key={item.listID}
                      text={item.listName}
                      imgUrl="/Union.png"
                      onClick={() => selectTargetList(item)}
                    ></Button>
                  );
                })}
                {/* 取得清單資料，並渲染到畫面 */}
              </ul>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-7 text-center">
                <div className="mb-4">
                  <Button text={targetList.listName} imgUrl="/Union.png"></Button>
                </div>
                <p className="fs-5 text-primary-05 fw-bold mb-7 ">
                  世界再吵，我都在 <br /> 陪你一起聆聽內心的聲音
                </p>
                <span className="text-black-700">23 人在線</span>
              </div>
              <div style={{ width: "800px" }}>
                <ul>
                  {targetList.songsID.map((song, index) => {
                    return (
                      <li key={song} onClick={() => selectPlaylist(targetList.listID, index)}>
                        {song}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-liner">
        <div className="container py-11">
          <div className="fs-2 text-primary-05 fw-bold mb-9">
            <p>這裡</p>
            <p>收錄著相似的共鳴</p>
          </div>
          <p className="fs-5 text-black-700 mb-6 ">大家都在聽</p>
          <div className="row row-cols-2 row-cols-md-4 g-6 text-center ">
            <div className="col ">
              <div className="tag-playlist h-100 py-9 px-7 fw-bold text-primary-05 gap-3 rounded-4">
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
        ></div>
      </div>
    </>
  );
}

export default Playlist;
