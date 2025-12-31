// pages/Home.jsx

// 引入功能模組（整個功能）
import HomeMoodText from '../features/homeMoodText/HomeMoodText';

// （如果你想包卡片，可用 component）
// import Card from '../components/Card';

function Home() {
  return (
    <main className="container py-4">
      <h1>心途 InnerSoul</h1>

      {/* 功能區塊 */}
      <HomeMoodText />
    </main>
  );
}

export default Home;