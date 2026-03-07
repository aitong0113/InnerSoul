import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconCheck,
  IconLock,
  IconCreditCard,
  IconInfoCircleFilled,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import SubscriptionTermsModal from "../../components/features/subscription/SubscriptionTermsModal";
import SubscriptionCancelModal from "../../components/features/subscription/SubscriptionCancelModal";
import ChangeCardModal from "../../components/features/subscription/ChangeCardModal";
import { authStore } from "../../services/auth/authStore";
import api from "../../services/api";
import "../../components/features/subscription/subscription.scss";
import { motion } from "motion/react";
import { fadeIn } from "../../components/animation/motion";

const SubscriptionManagement = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showChangeCardModal, setShowChangeCardModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardInfo, setCardInfo] = useState({ brand: "Visa", last4: "4242" });

  const PRO_FEATURES = [
    "語音內容庫：全庫解鎖",
    "情緒儀表板：情緒趨勢分析 / 月曆回顧",
    "播放清單：可建立專屬個人播放清單",
    "所有語音收藏",
    "心情日記：無限篇數、完整紀錄",
    "沈浸式無廣告干擾體驗",
  ];

  // 左側：目前擁有的免費權益
  const FREE_BENEFITS = [
    "語音內容庫：可試聽免費專區",
    "播放器：基礎功能 (需手動切換)",
    "心情日記：體驗版 (上限 3 篇)",
    "情緒儀表板：僅查看當日狀態",
  ];

  // 右側：升級後可獲得的權益
  const UPGRADE_BENEFITS = [
    "語音內容庫：全庫解鎖",
    "情緒儀表板：情緒趨勢分析/月曆回顧",
    "播放清單：可建立專屬個人播放清單",
    "所有語音收藏",
    "心情日記：無限篇數、完整紀錄",
    "沈浸式無廣告干擾體驗",
  ];

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const userId = authStore.getUserId();
        if (!userId) {
          navigate("/login");
          return;
        }

        const res = await api.get(`/users/${userId}`);
        setCurrentUser(res.data);
      } catch (err) {
        console.error("無法讀取會員資料", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMemberData();
  }, [navigate]);

  if (loading) return <div className="p-5 text-center">載入中...</div>;
  if (!currentUser) return null;

  const handleCancelSubscription = async () => {
    setIsProcessing(true);
    try {
      const userId = currentUser.id;

      await api.patch(`/users/${userId}`, {
        plan: "free",
      });

      setCurrentUser((prev) => ({
        ...prev,
        plan: "free",
      }));

      authStore.updateUserPlan("free");
      window.dispatchEvent(new Event("auth-update"));
    } catch (error) {
      console.error("取消訂閱失敗", error);
      alert("處理失敗，請稍後再試");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <div className="p-5 text-center">載入中...</div>;
  if (!currentUser) return null;

  const isPro = currentUser.plan === "pro";

  // 免費會員
  const renderFreeView = () => (
    <div className="row g-4 justify-content-center">
      {/* 左側：目前狀態 */}
      <div className="col-lg-4 col-md-6">
        <div className="card-box p-lg-7 p-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span className="text-secondary fs-5">目前方案</span>
            <span className="status-badge gray">永久有效</span>
          </div>
          <h2 className="fw-bold mt-4 text-secondary">輕量體驗會員</h2>

          <div className="rounded-4 p-4 mt-4" style={{ backgroundColor: "#EAECEF" }}>
            <div className="fw-bold mb-6 d-flex align-items-center gap-2 text-dark">
              <IconLock size={18} className="text-secondary" />
              您目前享有的會員權益：
            </div>

            <ul className="list-unstyled m-0 d-flex flex-column gap-3">
              {FREE_BENEFITS.map((item, index) => (
                <li
                  key={index}
                  className="d-flex align-items-center gap-2 text-secondary small fw-bold"
                >
                  <IconCircleCheckFilled size={18} className="flex-shrink-0 text-secondary" />
                  <span style={{ lineHeight: "1.8" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 右側：升級 CTA */}
      <div className="col-lg-6 col-md-6">
        <div className="card-box highlight-border justify-content-center text-center p-lg-7 p-5">
          <div className="mb-8">
            <h3 className="fw-bold mb-8">解鎖完整陪伴功能</h3>
            <p
              className="text-secondary mx-auto small mb-4"
              style={{ maxWidth: "100%", lineHeight: "1.6" }}
            >
              升級至深度陪伴會員，獲得最完整的心情日記紀錄、情緒分析儀表板，以及全庫語音暢聽。
            </p>
          </div>

          <div className="text-start mb-3 d-flex align-items-center gap-3 small fw-bold text-secondary px-2">
            <IconLock size={16} color="#398C9F" /> 訂閱即可解鎖以下功能：
          </div>

          <div className="row g-3 mb-11 text-start px-2">
            {UPGRADE_BENEFITS.map((item, index) => (
              <div key={index} className="col-lg-12 d-flex align-items-start gap-3">
                <IconCheck
                  size={18}
                  className="flex-shrink-0"
                  style={{ color: "#398C9F", strokeWidth: 3 }}
                />
                <span
                  className="text-secondary small fw-bold"
                  style={{ lineHeight: "1.8", fontSize: "0.85rem" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div>
            <button
              className="btn btn-primary-teal rounded-pill px-5 py-3 fw-bold fs-5 shadow-sm w-75"
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    planId: "plan_pro",
                    planName: "深度陪伴會員",
                    price: 199,
                  },
                })
              }
            >
              立即解鎖
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Pro 會員
  const renderProView = () => (
    <div className="row g-4 align-items-stretch justify-content-center">
      {/* 左側：詳細資訊 */}
      <div className="col-lg-7 col-md-6">
        <div className="card-box p-lg-7 p-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span className="text-secondary fs-5">目前方案</span>
            <span className="status-badge green">啟用中</span>
          </div>
          <h2 className="fw-bold mb-5 text-dark">深度陪伴會員</h2>

          <div className="subscription-details mb-4 flex-grow-1">
            <div className="info-row">
              <span className="label">本次陪伴週期</span>
              <span className="value">2026/03/08 ~ 2026/04/07</span>
            </div>
            <div className="info-row">
              <span className="label">下次扣款日期</span>
              <span className="value">2026/04/08</span>
            </div>
            <div className="info-row">
              <span className="label">付款方式</span>
              <span className="value d-flex align-items-center gap-2">
                <IconCreditCard size={20} color="#398C9F" /> 信用卡 {cardInfo.brand} (••••{" "}
                {cardInfo.last4})
              </span>
            </div>
            <div className="info-row">
              <span className="label">扣款金額</span>
              <span className="value">NT$ 199 / 月</span>
            </div>
          </div>

          <div className="rounded-4 p-4 my-8" style={{ backgroundColor: "#EAECEF" }}>
            {/* 標題 */}
            <div className="fw-bold mb-3 d-flex align-items-center gap-2 text-dark">
              <IconLock size={20} style={{ color: "#398C9F" }} />
              您目前享有的會員權益：
            </div>

            {/* 內容列表 */}
            <div className="row g-3">
              {PRO_FEATURES.map((item, index) => (
                <div key={index} className="col-lg-6 d-flex align-items-start gap-2">
                  {/* Icon */}
                  <IconCircleCheckFilled
                    size={20}
                    className="flex-shrink-0"
                    style={{ color: "#398C9F" }}
                  />
                  {/* 文字 */}
                  <span className="text-secondary small fw-bold" style={{ lineHeight: "1.4" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex gap-3">
            <button
              className="btn btn-outline-gray rounded-pill py-2 w-100"
              onClick={() => setShowCancelModal(true)}
            >
              取消訂閱
            </button>
            <button
              className="btn btn-outline-gray rounded-pill py-2 w-100"
              onClick={() => setShowChangeCardModal(true)}
            >
              變更付款信用卡
            </button>
          </div>
        </div>
      </div>

      {/* 右側：其他選項 */}
      <div className="col-lg-3 col-md-6">
        <div className="card-box d-flex flex-column p-lg-7 p-5">
          <h5 className="fs-6 text-secondary mb-4">其他方案選項</h5>

          <div className="border rounded-4 p-5 mb-3">
            <h4 className="fs-5 fw-bold mb-2">年繳方案(省 20%)</h4>
            <div className="fs-5 fw-bold text-primary-teal mb-3" style={{ color: "#398C9F" }}>
              NT$ 1,990 / 年
            </div>
            <button className="btn btn-secondary rounded-pill w-100 disabled" disabled>
              即將推出
            </button>
          </div>

          <p className="small text-muted mt-2 text-start">
            * 變更方案將於下個計費週期生效。
            <br />* 取消訂閱後，您仍可使用權限直到目前週期結束。
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-liner subscription-management-container">
      <motion.div className="container" {...fadeIn()}>
        <h2 className="row management-title text-primary-05 mb-lg-7 mb-5">我的訂閱狀態</h2>
        {isPro ? renderProView() : renderFreeView()}

        <div className="text-center mt-10 text-muted small d-flex align-items-center justify-content-center gap-1">
          <button
            className="terms-btn fw-bold"
            onClick={() => setShowModal(true)}
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              padding: 0,
            }}
          >
            <IconInfoCircleFilled size={18} className="me-1" />
            訂閱條款與注意事項
          </button>
        </div>
        {/* Modal */}
        {showModal && <SubscriptionTermsModal onClose={() => setShowModal(false)} />}

        {/* 取消訂閱確認視窗 */}
        {showCancelModal && (
          <SubscriptionCancelModal
            onClose={() => setShowCancelModal(false)}
            onConfirm={handleCancelSubscription}
            isProcessing={isProcessing}
          />
        )}

        {/* 變更信用卡視窗 */}
        {showChangeCardModal && (
          <ChangeCardModal
            onClose={() => setShowChangeCardModal(false)}
            onCardUpdated={(info) => setCardInfo(info)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default SubscriptionManagement;
