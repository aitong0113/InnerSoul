import CloudItem from "./CloudItem";
import { clouds } from "./cloudData";
import "./AudioPreviewSection.scss";

const AudioPreviewSection = ({ selectPlaylist }) => {
  return (
    <div className="pt-11 sky-container">
      <div className="container">
        <div>
          <h2 className="text-primary-05 text-md-1 fw-bold mb-1 mb-sm-3">哪些情緒</h2>
          <h2 className="text-primary-05 fw-bold mb-3 mb-sm-6">最近常出現在你的生活裡？</h2>
          <p className="fs-5 fw-bold text-black-700 mb-11">點擊一個最貼近的情緒聽聽</p>
        </div>
      </div>
      <div className="clouds-stage-outer">
        <div className="clouds-wrapper">
          {clouds.map((cloud, index) => {
            const duration = 4 + (index % 3) * 1.5;
            const delay = (index * 0.5) % 3;

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
                // id搭配songId
                onClick={() => selectPlaylist(cloud.id)}
                // onClick={() => console.log(`Clicked: ${cloud.id}`)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AudioPreviewSection;
