import { IconLockDollar, IconPlayerPlayFilled, IconPlayerPauseFilled } from "@tabler/icons-react";
import { authStore } from "../../services/auth/authStore.js";
import { useNavigate } from "react-router-dom";

function PlaylistRecommend({ lists, selectPlaylist, currentListId, isPlaying }) {
  const plan = authStore.getUserPlan();
  const navigate = useNavigate();
  const isCurrentList = (playlistId) => playlistId === currentListId;
  return (
    <section className="bg-liner">
      <div className="container py-11">
        <div className="fs-5 fs-md-2 text-primary-05 fw-bold ms- mb-2 mb-md-9 ps-3 ps-md-0">
          <p className="mb-0">這裡</p>
          <p className="mb-0">收錄著相似的共鳴</p>
        </div>

        <p className="fs-6 fs-md-5 text-black-700 mb-2 mb-md-6 ps-3 ps-md-0">大家都在聽</p>

        <div className="row row-cols-1 row-cols-md-5 g-6 text-center justify-content-center">
          {lists
            ?.filter((item) => item.ownerID !== 2)
            ?.sort((a, b) => (b.followerCount || 0) - (a.followerCount || 0))
            ?.slice(0, 5)
            .map((item) => (
              <div className="col " key={item.id}>
                <div
                  className="btn border-0 tag-playlist mx-auto py-9 px-7 fw-bold text-primary-05 gap-3 rounded-4 d-flex align-items-center justify-content-center position-relative"
                  style={{ height: "200px", width: "200px" }}
                >
                  <h5 className="mb-0 fw-bold">{item.listName}</h5>
                  <button
                    type="button"
                    className={`position-absolute bottom-0 start-50 translate-middle btn border-0 playlist-play-btn ${isCurrentList(item.id) ? "is-current" : ""}`}
                    onClick={() => {
                      if (plan !== "pro") {
                        const confirmed = window.confirm("此功能需升級為深度方案，是否前往訂閱？");
                        if (confirmed) navigate("/subscription");
                        return;
                      }

                      selectPlaylist(item.id);
                    }}
                    aria-label="播放歌單"
                  >
                    {plan === "pro" ? (
                      isPlaying && isCurrentList(item.id) ? (
                        <IconPlayerPauseFilled size={32} className="text-primary-05" />
                      ) : (
                        <IconPlayerPlayFilled size={32} className="text-primary-05" />
                      )
                    ) : (
                      <IconLockDollar size={32} />
                    )}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default PlaylistRecommend;
