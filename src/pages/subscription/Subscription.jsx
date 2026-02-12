import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from "../../services/api.js";
import { IconInfoCircleFilled } from '@tabler/icons-react';
import SubscriptionCard from '../../components/features/subscription/SubscriptionCard';
import SubscriptionTermsModal from '../../components/features/subscription/SubscriptionTermsModal';
import SubscriptionStatusBanner from '../../components/features/subscription/SubscriptionStatusBanner';
import '../../components/features/subscription/subscription.scss';

const Subscription = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plansRes = await api.get('/plans');
        setPlans(plansRes.data);
        console.log("成功抓取方案:", plansRes.data);

        const userId = Cookies.get("userId");
        if (userId) {
          const userRes = await api.get(`/users/${userId}`);
          setCurrentUser(userRes.data);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("資料載入發生錯誤:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="subscription-container bg-liner">
      <div className='container'>
        {/* 標題區塊 */}
        <div className="text-center mb-5 header-section">
          <h2 className="fw-bold fs-1 text-primary-05 mb-0">選擇適合你​的​陪伴​方案​</h2>
          <p className="fs-5 text-black-700 py-5">
            無論​你需要​輕量​的​放鬆，​還是​深度​的​情緒​支持，​心途​都​在​這裡
          </p>
        </div>

        {/* 會員訂閱狀態 */}
        {currentUser && (
          <div className="row justify-content-center mb-4">
            <div className="col-lg-10">
              <SubscriptionStatusBanner userPlan={currentUser.plan} />
            </div>
          </div>
        )}

        {/* 卡片區塊 */}
        <div className="row justify-content-center g-4 py-10">
          {plans.length > 0 ? (
            plans.map((plan) => (
              <div className="col-lg-5 col-md-6 d-flex" key={plan.id}>
                <SubscriptionCard
                  {...plan}
                  features={plan.uiFeatures}
                  userPlan={currentUser?.plan}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-5">載入方案中...</div>
          )}
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