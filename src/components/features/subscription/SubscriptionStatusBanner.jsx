import { IconHeartFilled } from "@tabler/icons-react";
import "./subscription.scss";

const SubscriptionStatusBanner = ({ userPlan }) => {

  const isPro = userPlan === "pro";

  return (
    <div className={`subscription-status-banner ${isPro ? "is-pro" : "is-free"}`}>
      <div className="content-wrapper">
        {/* 左側 Icon */}
        <div className="icon-box">
          <IconHeartFilled size={24} color={isPro ? "#398C9F" : "#757575"} />
        </div>

        {/* 中間文字 */}
        <div className="text-info">
          <h3 className="status-title">
            {isPro ? "你目前是深度陪伴會員" : "你目前是輕量體驗會員"}
          </h3>
          <p className="status-desc">
            {isPro
              ? "感謝你的支持，你的心途旅程正在進行中"
              : "立即訂閱，解鎖完整陪伴功能"
            }
          </p>
        </div>
      </div>

      {/* 右側按鈕 */}
      <button className="upgrade-btn">
        {isPro ? "管理我的訂閱方案" : "升級訂閱方案"}
      </button>
    </div>
  );
};

export default SubscriptionStatusBanner;