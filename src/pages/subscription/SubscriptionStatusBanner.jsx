import { IconHeartFilled } from '@tabler/icons-react';
import './subscription.scss';

const SubscriptionStatusBanner = () => {
  return (
    <div className="subscription-status-banner">
      <div className="content-wrapper">
        {/* 左側 Icon */}
        <div className="icon-box">
          <IconHeartFilled size={24} /> 
        </div>
        
        {/* 中間文字 */}
        <div className="text-info">
          <h3 className="status-title">你目前是輕量體驗會員</h3>
          <p className="status-desc">立即訂閱，解鎖完整陪伴功能</p>
        </div>
      </div>

      {/* 右側按鈕 */}
      <button className="upgrade-btn">
        升級訂閱方案
      </button>
    </div>
  );
};

export default SubscriptionStatusBanner;