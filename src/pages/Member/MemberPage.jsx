import "./MemberPage.scss";
import { useState } from "react";
import { IconRotateClockwise } from "@tabler/icons-react";
import { getMoodText } from "../../components/features/homeMoodText/getMoodText";
import avatarYouyou from "../../assets/userImg/悠悠.png";
import { authStore } from "../../services/auth/authStore";

function MemberPage() {
  const [text, setText] = useState(getMoodText());
  const [isDisabled, setIsDisabled] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [activeTab, setActiveTab] = useState("member");
  const [isFading, setIsFading] = useState(false);
  const userName = authStore.getUserName();

  const userImgKey = localStorage.getItem("userImg");

  const avatarMap = {
    "悠悠.png": avatarYouyou,
  };

  const avatarSrc = avatarMap[userImgKey] || avatarYouyou;

  const handleChangeMood = () => {
    if (isDisabled) return;

    setIsDisabled(true);
    setIsRotating(true);
    setIsFading(true);

    setTimeout(() => {
      setText(getMoodText());
      setIsFading(false);
    }, 300);

    setTimeout(() => {
      setIsRotating(false);
      setIsDisabled(false);
    }, 600);
  };

  return (
    <main className="member-page">
      {/* 頂部頁籤 */}
      <nav className="member-tabs">
        <button className={activeTab === "member" ? "active" : ""} onClick={() => setActiveTab("member")}>心途會員</button>
        <button className={activeTab === "favorite" ? "active" : ""} onClick={() => setActiveTab("favorite")}>語音收藏</button>
        <button className={activeTab === "playlist" ? "active" : ""} onClick={() => setActiveTab("playlist")}>播放清單</button>
      </nav>

      {activeTab === "member" && (
        <>
          {/* 會員卡片 */}
          <section className="member-card">
            <img
              className="avatar"
              src={avatarSrc}
              alt={`${userName || "會員"} 的頭像`}
            />
            <div className="info">
              <h2>你好，{userName || "會員"}</h2>
              <div className="quote-row">
                <p className={`quote ${isFading ? "fade-out" : "fade-in"}`}>
                  {text}
                </p>
                <button className="refresh-btn" onClick={handleChangeMood} disabled={isDisabled}>
                  <IconRotateClockwise size={18} className={isRotating ? "rotate-once" : ""} />
                </button>
              </div>
            </div>
          </section>

          {/* 本月回顧 */}
          <section className="month-review">
            <h3>讓我們一起回顧本月心情點滴吧</h3>
            <div className="review-grid">
              <div className="review-card">12 月<br/>心情打卡率 100%</div>
              <div className="review-card empty" />
            </div>
          </section>

          {/* 情緒推薦 */}
          <section className="emotion-block">
            <p className="emotion-title">這個月你按下了 60% 的 🙂 喜悅</p>
            <div className="emotion-list">
              <div className="emotion-cloud">喜悅</div>
              <ul>
                <li>🎵 喜悅・歡樂時光 ▶</li>
                <li>🎵 喜悅・歡樂時光 ▶</li>
                <li>🎵 喜悅・歡樂時光 ▶</li>
              </ul>
            </div>
          </section>

          {/* 底部統計 */}
          <section className="member-stats">
            <div className="stat-card">9,420<br/><span>小時</span></div>
            <div className="stat-card">10<br/><span>播放清單</span></div>
            <div className="stat-card">520<br/><span>日記</span></div>
          </section>
        </>
      )}

      {activeTab === "favorite" && <section className="placeholder">我的語音收藏</section>}
      {activeTab === "playlist" && <section className="placeholder">我的播放清單</section>}
    </main>
  );
}
export default MemberPage;