import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleSongLike } from "../../slices/userLikeSlice";
import { togglePlaylistFollow } from "../../slices/playlistFollowSlice";
import { makeSelectUserLikesView, selectPlaylistsView } from "../../slices/selectors";

import Button from "../../components/common/Button/Button";
import {
  IconMusic,
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconChevronLeft,
  IconChevronRight,
  IconHeartFilled,
  IconHeart,
} from "@tabler/icons-react";
import { authStore } from "../../services/auth/authStore";

function SinglePlaylist({ selectPlaylist }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = authStore.getUserId();
  const playlists = useSelector((state) => selectPlaylistsView(state, userId));

  const selectLikesView = useMemo(() => makeSelectUserLikesView(), []);
  const { currentIndex, isPlaying, currentListId } = useSelector((state) => state.player);
  const { likedSongIds } = useSelector((state) => selectLikesView(state, userId));

  const { id } = useParams();

  const targetList = useMemo(() => {
    if (!id) return null;
    return playlists.find((p) => p.id === Number(id)) ?? null;
  }, [id, playlists]);

  if (!targetList) {
    return <p className="text-center">載入中...</p>;
  }
  const isFollowed = targetList.isFollowed;

  return (
    <>
      <section>
        <div className="container py-11 d-flex align-items-center justify-content-between position-relative">
          <div className="mb-4 text-center">
            <Button
              text={targetList.listName}
              imgUrl={`${import.meta.env.BASE_URL}Union.png`}
              className="mb-4"
            />
            <div className="fs-5 text-primary-05 fw-bold mb-7">
              <p>世界再吵，我都在</p>
              <p>陪你一起聆聽內心的聲音</p>
            </div>
            <div className="d-flex justify-content-around align-items-center">
              <p className="text-black-700 mb-0">
                <small>23 人在線</small>
              </p>
              <button
                className={`btn ${isFollowed ? "btn-primary-05" : "btn-primary"}`}
                type="button"
                onClick={async () => {
                  if (!userId) {
                    const shouldLogin = window.confirm(
                      "登入後才能把這份陪伴加入你的清單，是否前往登入？"
                    );
                    if (shouldLogin) navigate("/login");
                    return;
                  }

                  await dispatch(
                    togglePlaylistFollow({
                      userId,
                      playlistId: targetList.id,
                    })
                  );
                }}
              >
                {isFollowed ? "已追蹤" : "追蹤"}
              </button>
            </div>
          </div>

          <div>
            <ul style={{ width: "800px" }} className="mb-6">
              {targetList?.songs?.map((song, index) => {
                const isCurrent = currentListId === targetList.id && currentIndex === index;
                const showPause = isCurrent && isPlaying;
                const isLiked = likedSongIds.includes(song.id);
                return (
                  <li
                    key={song.id}
                    className={`list-item d-flex align-items-center justify-content-between mb-5 fs-5 fw-bold ${
                      isCurrent ? "text-primary-05" : ""
                    }`}
                    style={{ listStyle: "none" }}
                    onClick={() => selectPlaylist(targetList.id, index)}
                  >
                    <div>
                      <IconMusic size={15} className="me-2" />
                      <span className="badge text-bg-primary-02 rounded-pill me-4">
                        {song?.category}
                      </span>
                      {song?.name}
                    </div>

                    <div className="hover-actions">
                      <button
                        type="button"
                        className={
                          "me-3 btn border-0" + (isCurrent ? " text-primary-05" : " item-play")
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          selectPlaylist(targetList.id, index);
                        }}
                        aria-label="播放 / 暫停"
                      >
                        {showPause ? (
                          <IconPlayerPauseFilled size={24} />
                        ) : (
                          <IconPlayerPlayFilled size={24} />
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn border-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!userId) {
                            const shouldLogin =
                              window.confirm("登入後才能把這首聲音收藏起來，是否前往登入？");
                            if (shouldLogin) navigate("/login");
                            return;
                          }
                          dispatch(
                            toggleSongLike({
                              userId,
                              songId: song.id,
                            })
                          );
                        }}
                        aria-label="喜歡"
                      >
                        {isLiked ? (
                          <IconHeartFilled size={24} className="text-primary-05" />
                        ) : (
                          <IconHeart size={24} className="text-primary-05" />
                        )}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

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
