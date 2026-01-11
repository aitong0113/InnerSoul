import React from 'react';
import './homeHero.css';

const HomeHero = () => {
  // 這裡之後可以放置「更換小語」的邏輯 (State)

  return (
    <section className="hero-container">
      <div className="hero-content">
        {/* 左側：文字區 */}
        <div className="hero-left">
          <h1>用一段語音、一篇日記<br />整理內在的自己</h1>
          <p>在混亂與忙碌之間，留一段時間給自己，讓語音與文字陪你聽見內在的聲音。</p>
          <button className="cta-button">開始訂閱你的心途</button>
        </div>

        {/* 右側：金句卡片區 */}
        <div className="hero-right">
          <div className="quote-card">
            <div className="quote-header">
              <span>🌼 今日心途小語</span>
              <button className="refresh-btn">🔄 換一換</button>
            </div>
            <div className="quote-body">
              <p>「你現在的樣子不需要完美，只需要願意前進一步。」</p>
            </div>
            <div className="quote-footer">
              - 心途 Inner Soul
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;