import { IconLock, IconLockOpen, IconDiscountCheckFilled } from "@tabler/icons-react";

const OrderSummary = ({ planName, price }) => {
  const features = [
    "語音內容庫：全庫解鎖",
    "情緒儀表板：情緒趨勢分析 / 月曆回顧",
    "播放清單：可建立專屬個人播放清單",
    "所有語音收藏",
    "心情日記：無限篇數、完整紀錄",
    "沈浸式無廣告干擾體驗",
  ];

  return (
    <div className="order-summary-section">
      {/* 安全結帳標示 */}
      <div className="secure-label mb-10">
        <IconLock size={16} />
        安全結帳
      </div>

      {/* 方案標題與價格 */}
      <div className="plan-info">
        <div>
          <h3>{planName}方案(月訂閱)</h3>
          <p>解鎖所有內容、無限制日記與進階功能</p>
        </div>
        <div className="price-tag">
          <div className="amount">NT$ {price}</div>
          <span className="freq">/ 每月自動扣款</span>
        </div>
      </div>

      {/* 權益區塊 */}
      <div className="features-box p-lg-7 p-5">
        <div className="box-title">
          <IconLockOpen size={18} />
          訂閱解鎖權益 :
        </div>
        <div className="features-grid">
          {features.map((item, index) => (
            <div key={index} className="feature-item">
              <IconDiscountCheckFilled size={18} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
