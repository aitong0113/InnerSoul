import "./MemberPage.scss";
import HomeMoodText from "../../components/features/homeMoodText/useHomeMoodText";

function MemberPage() {
  return (
    <main className="member-page mt-5 py-11">
      <h1 className="text-center fw-bold text-primary-05 pb-5">會員中心</h1>

      {/* 頁籤切換 */}
      <nav className="member-tabs">
        <button className="active">心途會員</button>
        <button>我的語音收藏</button>
        <button>我的專屬播放清單</button>
      </nav>

      {/* 使用者資訊 */}
      <section className="member-profile">
        <div className="profile-header">
          <h2>你好，使用者名稱 <span className="edit">✏️</span></h2>
          <p>目前方案：<strong>基礎會員</strong></p>
        </div>

        <div className="mood-quote">
          <useHomeMoodText/>
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
    </main>
  );
}
export default MemberPage;