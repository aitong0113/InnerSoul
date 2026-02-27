import { useState } from "react";
import { IconPencil, IconPlayerPlay, IconTrash } from "@tabler/icons-react";
import "./PlaylistCard.scss";

function PlaylistCard({
  playlist,
  size = "small", // small | large
  showEditButton = false,
  showEditMode = false,
  onSaveEdit,
  onDelete,
  onClick,
  isFollowed = false,
  onToggleFollow,
  followerCount,
}) {
  const { listName, songsID = [] } = playlist;
  const songCount = songsID.length;

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(listName);
  const [editDesc, setEditDesc] = useState(
    playlist.listDescription || ""
  );

  const handleStartEdit = (e) => {
    e.stopPropagation();
    setEditName(listName);
    setEditDesc(playlist.listDescription || "");
    setIsEditing(true);
  };

  const handleCancelEdit = (e) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (onSaveEdit) {
      onSaveEdit(playlist.id, {
        listName: editName,
        listDescription: editDesc,
      });
    }
    setIsEditing(false);
  };

  return (
    <div className={`playlist-card ${size}`} onClick={onClick} role="button" tabIndex={0}>
      {size === "small" && (
        <>
          <div className="playlist-cover">
            <img src={playlist.coverImg || `${import.meta.env.BASE_URL}Union.png`} alt={listName} className="cloud-bg" />
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
            <img src={playlist.coverImg || `${import.meta.env.BASE_URL}Union.png`} alt={listName} className="cloud-bg" />
          </div>
          <div className="playlist-details">
            {isEditing ? (
              <div className="edit-form">
                <input
                  className="edit-input"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="播放清單名稱"
                />
                <textarea
                  className="edit-textarea"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  rows={3}
                  placeholder="播放清單描述"
                />
                <div className="edit-actions">
                  <button className="save-btn" onClick={handleSave}>
                    儲存
                  </button>
                  <button className="cancel-btn" onClick={handleCancelEdit}>
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="playlist-title-large">{listName}</h3>
                <p className="playlist-description">
                  {playlist.listDescription || "世界再吵，我都在陪你一起聽著心的聲音"}
                </p>
                {showEditMode ? (
                  <div className="playlist-edit-actions">
                    <button className="edit-playlist-btn" onClick={handleStartEdit}>
                      <IconPencil size={16} />
                      修改
                    </button>
                    <button
                      className="delete-playlist-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm("確定要刪除此播放清單嗎？")) {
                          onDelete && onDelete(playlist.id);
                        }
                      }}
                    >
                      <IconTrash size={16} />
                      刪除
                    </button>
                  </div>
                ) : (
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
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaylistCard;
