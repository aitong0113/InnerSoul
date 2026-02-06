import { IconPlayerPlay, IconHeart, IconPlus } from "@tabler/icons-react";
import "./SongCard.scss";

function SongCard({
    song,
    showAddButton = false,
    showFavoriteButton = false,
    showPlayButton = true,
    isFavorited = false,
    onPlay,
    onAdd,
    onFavorite,
}) {
    return (
        <div className="song-card">
            <div className="song-cover">
                <img src={song.thumb || "/Union.png"} alt={song.fileName} />
            </div>
            <div className="song-info">
                <h4 className="song-title">{song.fileName}</h4>
                <p className="song-artist">{song.author}</p>
            </div>
            <div className="song-actions">
                {showAddButton && (
                    <button
                        className="action-btn add-btn"
                        onClick={() => onAdd?.(song)}
                        title="加入清單"
                    >
                        <IconPlus size={20} />
                    </button>
                )}
                {showFavoriteButton && (
                    <button
                        className={`action-btn favorite-btn ${isFavorited ? "favorited" : ""}`}
                        onClick={() => onFavorite?.(song)}
                        title={isFavorited ? "取消收藏" : "加入收藏"}
                    >
                        <IconHeart size={20} fill={isFavorited ? "currentColor" : "none"} />
                    </button>
                )}
                {showPlayButton && (
                    <button
                        className="action-btn play-btn"
                        onClick={() => onPlay?.(song)}
                        title="播放"
                    >
                        <IconPlayerPlay size={24} fill="currentColor" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default SongCard;
