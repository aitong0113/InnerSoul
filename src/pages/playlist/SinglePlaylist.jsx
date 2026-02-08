import { useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../components/common/Button/Button";
import {
  IconMusic,
  IconPlayerPlayFilled,
  IconDots,
  IconPlus,
  IconPlayerPauseFilled,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

function SinglePlaylist({ lists, songs, selectPlaylist }) {
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const { id } = useParams();
  const location = useLocation();
  const isMemberPage = location.pathname === "/member";

  const targetList = useMemo(() => {
    if (!id || !lists.length) return null;
    const listId = Number(id);
    return lists.find((l) => l.id === listId) || null;
  }, [id, lists]);

  const songMap = useMemo(() => {
    const map = new Map();
    songs.forEach((s) => map.set(s.id, s));
    return map;
  }, [songs]);

  if (!targetList) {
    return <p className="text-center">載入中...</p>;
  }

  return (
    <>
      <section>
        <div className="container py-11 d-flex align-items-center justify-content-between position-relative">
          <div className="mb-4 text-center">
            <Button text={targetList.listName} imgUrl="/Union.png" className="mb-4" />
            <div className="fs-5 text-primary-05 fw-bold mb-7">
              <p>世界再吵，我都在</p>
              <p>陪你一起聆聽內心的聲音</p>
            </div>
            <p className="text-black-700">
              <small>23 人在線</small>
            </p>
          </div>
          {isMemberPage && (
            <button className="btn p-2 pe-4 btn-primary-05 fs-5 fw-bold position-absolute top-0 end-0 d-inline-flex align-items-center">
              <IconPlus size={24} className="me-1" />
              新增播放清單
            </button>
          )}

          <div>
            <ul style={{ width: "800px" }} className="mb-6">
              {targetList.songsID.map((songId, index) => {
                const song = songMap.get(songId);
                const isCurrent = currentSong?.id === song?.id;
                const isPlayingThis = isCurrent && isPlaying;
                return (
                  <li
                    key={songId}
                    className={`list-item d-flex align-items-center justify-content-between mb-5 fs-5 fw-bold ${isCurrent ? "text-primary-05" : ""}`}
                    onClick={() => selectPlaylist(targetList.id, index)}
                    style={{ listStyle: "none" }}
                  >
                    <div>
                      <IconMusic size={15} className="me-2" />
                      <span className="badge text-bg-primary-02 rounded-pill me-4">
                        {song?.category}
                      </span>
                      {song?.fileName}
                    </div>
                    <div className="hover-actions">
                      <button
                        type="button"
                        className={
                          " me-3 btn border-0" + (isCurrent ? " text-primary-05" : " item-play")
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          selectPlaylist(targetList.id, index);
                        }}
                        aria-label="播放/暫停"
                      >
                        {isPlayingThis ? (
                          <IconPlayerPauseFilled size={24} />
                        ) : (
                          <IconPlayerPlayFilled size={24} />
                        )}
                      </button>

                      <button
                        type="button"
                        className=" btn border-0"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="更多選項"
                      >
                        <IconDots size={24} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            {isMemberPage && (
              <button
                className="btn btn-outline-primary-05 fs-5 fw-bold w-100 d-inline-flex align-items-center justify-content-center"
                style={{ borderWidth: "2px" }}
              >
                <IconPlus size={24} className="me-1" />
                新增語音
              </button>
            )}
            <nav aria-label="Page navigation example " className="position-absolute bottom-0 end-0">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link border-0 text-black-300" href="#" aria-label="Previous">
                    <span aria-hidden="true">
                      <IconChevronLeft size={24} />
                    </span>
                  </a>
                </li>
                <li className="page-item ">
                  <a className="page-link text-primary-05 fw-bold border-0" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link border-0 text-primary-05" href="#" aria-label="Next">
                    <span aria-hidden="true">
                      <IconChevronRight size={24} />
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}

export default SinglePlaylist;
