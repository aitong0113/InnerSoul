// pages/Home.jsx

// 引入功能模組（整個功能）
import HomeMoodText from "../../components/features/homeMoodText/HomeMoodText.jsx";

// （如果你想包卡片，可用 component）
// import Card from '../components/Card';

function Home() {
  return (
    <main className="container py-4">
      <h1>心途 InnerSoul</h1>

      {/* 功能區塊 */}
      <HomeMoodText />

      <main className="site-main">
        <main className="bg-bg-02 py-10">
          <div className="container">{/* 中間內容 */}</div>
        </main>
      </main>
      <div>
        <div className="container text-center">
          <div className="row row-cols-3">
            <div className="col card card-linerBG py-9">
              <i className="bi bi-play-fill"></i>
              <p className="text-black-700 h5">音頻播放次數</p>
              <p className="text-primary-05 h2">12,483 次</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
