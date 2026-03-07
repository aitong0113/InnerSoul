import { useState, useEffect } from "react";
import { authStore } from "../../services/auth/authStore";
import api from "../../services/api.js";
import { IconInfoCircleFilled } from "@tabler/icons-react";
import SubscriptionCard from "../../components/features/subscription/SubscriptionCard";
import SubscriptionTermsModal from "../../components/features/subscription/SubscriptionTermsModal";
import SubscriptionStatusBanner from "../../components/features/subscription/SubscriptionStatusBanner";
import "../../components/features/subscription/subscription.scss";
import { motion } from "motion/react";
import { fadeIn } from "../../components/animation/motion";
import { ThreeDots } from "react-loader-spinner";

const Subscription = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plansRes = await api.get("/plans");
        setPlans(plansRes.data);

        const userId = authStore.getUserId();

        if (userId) {
          const userRes = await api.get(`/users/${userId}`);
          setCurrentUser(userRes.data);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("資料載入發生錯誤:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="subscription-container bg-liner">
        <div className="container">
          {/* 標題區塊 */}
          <motion.div className="text-center mb-5 header-section" {...fadeIn()}>
            <h1 className="text-center text-primary-04 fw-bold mb-lg-6 mb-5 fs-lg-2 fs-4 ">
              選擇適合你的陪伴方案
            </h1>
            <p className="fs-lg-5 text-black-700 mb-lg-9 mb-5 d-none d-lg-block">
              無論你需要輕量的放鬆，還是深度的情緒支持，心途都在這裡
            </p>
            <p className="fs-lg-5 text-black-700 mb-lg-9 mb-5 d-lg-none d-block">
              無論你需要輕量的放鬆，還是深度的情緒支持，
              <br /> 心途都在這裡
            </p>
          </motion.div>

          {/* 會員訂閱狀態 */}
          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <ThreeDots height="80" width="80" color="#6DB0B5" />
            </div>
          ) : (
            <motion.div className="row justify-content-center mb-4" {...fadeIn()}>
              <div className="col-lg-10">
                {currentUser && <SubscriptionStatusBanner userPlan={currentUser.plan} />}
              </div>
            </motion.div>
          )}

          {/* 卡片區塊 */}
          <motion.div
            className="row justify-content-center g-4 py-lg-10 py-6 gap-lg-0 gap-md-0 gap-4"
            {...fadeIn(0.5)}
          >
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
          </motion.div>
          {/* 訂閱條款 */}
          <motion.div className="terms-trigger-area" {...fadeIn(0.5)}>
            <button
              className="terms-btn custom-btn-text fw-bold"
              onClick={() => setShowModal(true)}
            >
              <IconInfoCircleFilled size={18} className="me-1" />
              訂閱條款與注意事項
            </button>
          </motion.div>

          {showModal && <SubscriptionTermsModal onClose={() => setShowModal(false)} />}
        </div>
      </section>
    </>
  );
};

export default Subscription;
