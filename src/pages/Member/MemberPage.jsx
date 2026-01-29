import "./MemberPage.scss";
import { useState } from "react";
import { IconRotateClockwise } from "@tabler/icons-react";
import HomeMoodText from "../../components/features/homeMoodText/HomeMoodText";
import { getMoodText } from "../../components/features/homeMoodText/getMoodText";

function MemberPage() {
  const [text, setText] = useState(getMoodText());
  const [isDisabled, setIsDisabled] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [activeTab, setActiveTab] = useState("member");
  const userName = localStorage.getItem("userName");

  const handleChangeMood = () => {
    if (isDisabled) return;

    setIsDisabled(true);
    setIsRotating(true);
    setText(getMoodText());

    setTimeout(() => {
      setIsRotating(false);
      setIsDisabled(false);
    }, 600);
  };

  return (
    <main className="member-page mt-5 py-11">
      <h1 className="text-center fw-bold text-primary-05 pb-5">會員中心</h1>

      {/* 頁籤切換 */}
      <nav className="member-tabs">
        <button
          className={activeTab === "member" ? "active" : ""}
          onClick={() => setActiveTab("member")}
        >
          心途會員
        </button>
        <button
          className={activeTab === "favorite" ? "active" : ""}
          onClick={() => setActiveTab("favorite")}
        >
          我的語音收藏
        </button>
        <button
          className={activeTab === "playlist" ? "active" : ""}
          onClick={() => setActiveTab("playlist")}
        >
          我的專屬播放清單
        </button>
      </nav>

      {activeTab === "member" && (
        <>
        {/* 使用者資訊 */}
        <section className="member-profile">
          <div className="profile-header">
            <h2>
              你好，{userName || "會員"} <span className="edit"><i class="bi bi-pencil-square fs-5"></i></span>
            </h2>
            <p>目前方案：<strong>基礎會員</strong></p>
          </div>

          <div className="mood-quote-body">
              <HomeMoodText text={text} />
          </div>

          <div className="mood-quote">
            <div className="mood-quote-header">
              <button
                type="button"
                className="btn refresh-btn"
                onClick={handleChangeMood}
                disabled={isDisabled}
              >
                <IconRotateClockwise
                  size={20}
                  className={isRotating ? "rotate-once" : ""}
                />
                <span className="ms-1">換一換</span>
              </button>
            </div>
          </div>
        </section>

        {/* 本月回顧 */}
        <section className="member-review">
          <h2 className="section-title">本月回顧</h2>
          <div className="review-grid">
            <div className="mood-bottle">心情點滴瓶</div>
            <div className="mood-bottle">心情點滴瓶</div>
          </div>
        </section>

        {/* 推薦語音 */}
        <section className="member-recommend">
          <h2 className="section-title">推薦專屬語音</h2>
          <div className="recommend-list">語音卡片列表</div>
        </section>

        {/* 我的收藏 */}
        <section className="member-collections">
          <div className="collection-grid">
            <div className="collection-card">我的語音收藏</div>
            <div className="collection-card">我的專屬播放清單</div>
            <div className="collection-card">我的日記</div>
          </div>
        </section>
        </>
      )}

      {activeTab === "favorite" && (
        <section className="member-favorite">
          <h2 className="section-title">我的語音收藏</h2>
          <p>這裡之後會放使用者收藏的語音列表。</p>
        </section>
      )}

      {activeTab === "playlist" && (
        <section className="member-playlist">
          <h2 className="section-title">我的專屬播放清單</h2>
          <p>這裡之後會放使用者建立的播放清單。</p>
        </section>
      )}
    </main>
  );
}
export default MemberPage;