import { IconPencil, IconPlayerPlay } from "@tabler/icons-react";
import "./PlaylistCard.scss";

function PlaylistCard({
  playlist,
  size = "small", // small | large
  showEditButton = false,
  onClick,
  isFollowed = false,
  onToggleFollow,
  followerCount,
}) {
  const { listName, songsID = [], popularity, listCover } = playlist;
  const songCount = songsID.length;

  return (
    <div className={`playlist-card ${size}`} onClick={onClick} role="button" tabIndex={0}>
      {size === "small" && (
        <>
          <div className="playlist-cover">
            <img src={`${import.meta.env.BASE_URL}Union.png`} alt="雲朵" className="cloud-bg" />
          </div>
          <div className="playlist-info">
            <h4 className="playlist-title">{listName}</h4>
            <p className="playlist-meta">{songCount} 則語音</p>
          </div>
          {showEditButton && (
            <button
              className="edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                // TODO: 編輯功能
              }}
            >
              <IconPencil size={18} />
            </button>
          )}
        </>
      )}

      {size === "large" && (
        <div className="playlist-large-content">
          <div className="playlist-cover-large">
            <img src={`${import.meta.env.BASE_URL}Union.png`} alt="雲朵" className="cloud-bg" />
          </div>
          <div className="playlist-details">
            <h3 className="playlist-title-large">{listName}</h3>
            <p className="playlist-description">
              {playlist.listDescription || "世界再吵，我都在陪你一起聽著心的聲音"}
            </p>
            <div className="playlist-stats d-flex align-items-center">
              <span className="stat-item">👁 {followerCount} 人氣</span>
              {onToggleFollow && (
                <button
                  className={`btn ${isFollowed ? "btn-primary-05" : "btn-primary"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFollow();
                  }}
                >
                  {isFollowed ? "已追蹤" : "追蹤"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaylistCard;
