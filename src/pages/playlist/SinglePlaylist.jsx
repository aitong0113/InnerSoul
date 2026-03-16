import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleSongLike } from "../../slices/userLikeSlice";
import { togglePlaylistFollow } from "../../slices/playlistFollowSlice";
import { makeSelectUserLikesView, selectPlaylistsView } from "../../slices/selectors";
import Swal from "sweetalert2";

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
import { motion } from "motion/react";
import { fadeIn } from "../../components/animation/motion";

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

  // 分頁
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const songs = targetList?.songs ?? [];
  const totalPages = Math.max(1, Math.ceil(songs.length / pageSize));
  const paginatedSongs = songs.slice((page - 1) * pageSize, page * pageSize);

  if (!targetList) {
    return <p className="text-center">載入中...</p>;
  }
  const isFollowed = targetList.isFollowed;

  return (
    <>
      <motion.section {...fadeIn()}>
        <div className="container py-11 d-md-flex align-items-center justify-content-between position-relative">
          <div className="mb-4 text-center">
            <Button
              text={targetList.listName}
              imgUrl={`${import.meta.env.BASE_URL}Union.png`}
              className="mb-4"
            />
            <div className="fs-6 fs-md-5 text-primary-05 fw-bold mb-4 mb-md-7">
              <p className="mb-1">世界再吵，我都在</p>
              <p className="mb-0">陪你一起聆聽內心的聲音</p>
            </div>
            <div className="d-md-flex justify-content-around align-items-center">
              <p className="text-black-700 mb-4 mb-md-0">
                <small>23 人在線</small>
              </p>
              <button
                className={`btn ${isFollowed ? "btn-primary-05" : "btn-primary"}`}
                type="button"
                onClick={async () => {
                  if (!userId) {
                    const result = await Swal.fire({
                      icon: "info",
                      title: "需要登入",
                      text: "登入後才能把這份陪伴加入你的清單",
                      confirmButtonText: "前往登入",
                      showCancelButton: true,
                      cancelButtonText: "稍後再說",
                      confirmButtonColor: "#6C8E9E",
                    });

                    if (result.isConfirmed) {
                      navigate("/login");
                    }

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

          <div style={{ maxWidth: "800px", width: "100%" }}>
            <ul className="mb-6">
              {paginatedSongs?.map((song, index) => {
                const realIndex = (page - 1) * pageSize + index;
                const isCurrent = currentListId === targetList.id && currentIndex === realIndex;
                const showPause = isCurrent && isPlaying;
                const isLiked = likedSongIds.includes(song.id);
                return (
                  <li
                    key={song.id}
                    className={`list-item d-flex align-items-center justify-content-between mb-4 mb-md-5 fs-5 fw-bold  ${
                      isCurrent ? "text-primary-05" : ""
                    }`}
                    style={{ listStyle: "none" }}
                    onClick={() => selectPlaylist(targetList.id, realIndex)}
                  >
                    <div>
                      <IconMusic size={15} className="me-2" />
                      <span className="badge bg-BG-02 rounded-pill text-black me-4">
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
                          selectPlaylist(targetList.id, realIndex);
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
                        onClick={async (e) => {
                          e.stopPropagation();

                          if (!userId) {
                            const result = await Swal.fire({
                              icon: "info",
                              title: "需要登入",
                              text: "登入後才能把這首聲音收藏起來",
                              confirmButtonText: "前往登入",
                              showCancelButton: true,
                              cancelButtonText: "稍後再說",
                              confirmButtonColor: "#6C8E9E",
                            });

                            if (result.isConfirmed) {
                              navigate("/login");
                            }

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

            <nav className="position-absolute bottom-0 end-0">
              <ul className="pagination">
                {/* 上一頁 */}
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    type="button"
                    className="page-link border-0 bg-transparent"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  >
                    <IconChevronLeft size={24} />
                  </button>
                </li>

                {/* 頁碼 */}
                <li className="page-item">
                  <span className="page-link border-0 text-primary-05 fw-bold bg-transparent">
                    {page} / {totalPages}
                  </span>
                </li>

                {/* 下一頁 */}
                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                  <button
                    type="button"
                    className="page-link border-0 bg-transparent"
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  >
                    <IconChevronRight size={24} />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </motion.section>
    </>
  );
}

export default SinglePlaylist;
