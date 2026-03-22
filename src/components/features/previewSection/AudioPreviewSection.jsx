import { useSelector } from "react-redux";
import CloudItem from "./CloudItem";
import { clouds } from "./cloudData";
import "./AudioPreviewSection.scss";

const AudioPreviewSection = ({ selectPlaylist }) => {
  const { currentListId, isPlaying } = useSelector((state) => state.player);
  return (
    <div className="pt-lg-11 pt-1 sky-container">
      <div className="container">
        <div>
          <h2 className="text-primary-05 fw-bold fs-lg-2 fs-md-4 mb-1 mb-sm-3">哪些情緒</h2>
          <h2 className="text-primary-05 fw-bold fs-lg-2 fs-md-4 mb-3 mb-sm-6">
            最近常出現在你的生活裡？
          </h2>
          <p className="fw-bold text-black-700 fs-lg-5 mb-11">點擊一個最貼近的情緒聽聽</p>
        </div>
      </div>
      <div className="clouds-stage-outer">
        <div className="clouds-wrapper">
          {clouds.map((cloud, index) => {
            const duration = 4 + (index % 3) * 1.5;
            const delay = (index * 0.5) % 3;

            const isActive = currentListId === cloud.id && isPlaying;

            return (
              <CloudItem
                key={cloud.id}
                label={cloud.label}
                color={cloud.color}
                path={cloud.path}
                viewBox={cloud.viewBox}
                className={`cloud-style-${cloud.id}`}
                style={{
                  "--cloud-top": cloud.top,
                  "--cloud-left": cloud.left,
                  "--cloud-width": cloud.width,
                  "--float-duration": `${duration}s`,
                  "--float-delay": `-${delay}s`,
                }}
                // 4. 新增：將判斷結果傳給 CloudItem
                isPlaying={isActive}
                // 點擊事件維持不變，讓原本的邏輯去處理切換歌單
                onClick={() => selectPlaylist(cloud.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AudioPreviewSection;
