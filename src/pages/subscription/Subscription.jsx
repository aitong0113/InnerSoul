import { useState } from 'react';
import { IconInfoCircleFilled } from '@tabler/icons-react';
import SubscriptionCard from './SubscriptionCard';
import SubscriptionTermsModal from './SubscriptionTermsModal';
import SubscriptionStatusBanner from './SubscriptionStatusBanner';
import { PRICING_PLANS } from './pricingData';
import './subscription.scss';

const Subscription = () => {

  const [showModal, setShowModal] = useState(false);

  return (
    <section className="subscription-container bg-liner">
      <div className='container'>
        {/* 標題區塊 */}
        <div className="text-center mb-5 header-section">
          <h2 className="fw-bold fs-1 text-primary-05 mb-0">選擇適合你​的​陪伴​方案​</h2>
          <p className="fs-5 text-black-700 py-5">
            無論​你需要​輕量​的​放鬆，​還是​深度​的​情緒​支持，​心途​都​在​這裡​
          </p>
        </div>

        {/* 會員狀態橫幅 */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-10">
            <SubscriptionStatusBanner />
          </div>
        </div>

        {/* 卡片列表區塊 */}
        <div className="row justify-content-center g-4 py-10"> 
          {PRICING_PLANS.map((plan) => (
            <div className="col-lg-5 col-md-6 d-flex" key={plan.id}>
              <SubscriptionCard {...plan} />
            </div>
          ))}
        </div>
        {/* 訂閱條款 */}
        <div className="terms-trigger-area">
          <button 
            className="terms-btn fw-bold" 
            onClick={() => setShowModal(true)}
          >
            <IconInfoCircleFilled size={18} className="me-1" />
            訂閱條款與注意事項
          </button>
        </div>


        {showModal && (
          <SubscriptionTermsModal onClose={() => setShowModal(false)} />
        )}
      </div>
    </section>
  );
};

export default Subscription;