import { IconLockDollar, IconPlayerPlayFilled, IconPlayerPauseFilled } from "@tabler/icons-react";
import { authStore } from "../../services/auth/authStore.js";

function PlaylistRecommend({ lists, selectPlaylist, currentListId, isPlaying }) {
  const plan = authStore.getUserPlan();
  const isCurrentList = (playlistId) => playlistId === currentListId;
  return (
    <section className="bg-liner">
      <div className="container py-11">
        <div className="fs-2 text-primary-05 fw-bold mb-9">
          <p>這裡</p>
          <p>收錄著相似的共鳴</p>
        </div>

        <p className="fs-5 text-black-700 mb-6">大家都在聽</p>

        <div className="row row-cols-2   row-cols-md-5 g-6 text-center justify-content-center">
          {lists
            .filter((item) => item.ownerID !== 2)
            .sort((a, b) => b.followerID.length - a.followerID.length)
            .slice(0, 5)
            .map((item) => (
              <div className="col" key={item.id}>
                <div
                  className="btn border-0 tag-playlist py-9 px-7 fw-bold text-primary-05 gap-3 rounded-4 d-flex align-items-center justify-content-center position-relative"
                  style={{ height: "200px", width: "200px" }}
                >
                  <h5 className="mb-0 fw-bold">{item.listName}</h5>
                  {plan === "pro" ? (
                    <button
                      type="button"
                      className={`position-absolute bottom-0 start-50 translate-middle btn border-0 playlist-play-btn ${isCurrentList(item.id) ? "is-current" : ""}`}
                      onClick={() => selectPlaylist(item.id)}
                      aria-label="播放歌單"
                    >
                      {isPlaying && isCurrentList(item.id) ? (
                        <IconPlayerPauseFilled size={32} className={`text-primary-05 `} />
                      ) : (
                        <IconPlayerPlayFilled size={32} className={`text-primary-05 `} />
                      )}
                    </button>
                  ) : (
                    <IconLockDollar
                      size={32}
                      className="position-absolute bottom-0 start-50 translate-middle"
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default PlaylistRecommend;
