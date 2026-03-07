import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IconArrowLeft } from "@tabler/icons-react";
import OrderSummary from "../../components/features/checkout/OrderSummary";
import PaymentForm from "../../components/features/checkout/PaymentForm";
import "../../components/features/checkout/checkout.scss";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get("userId");

    if (!userId) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const { planId, planName, price } = location.state || {};

  if (!planId) {
    return (
      <div className="container py-5 text-center">
        <h2>錯誤：未選擇方案</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/subscription")}>
          回訂閱頁選擇
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page bg-liner">
      <div className="container" style={{ maxWidth: "900px" }}>
        {/* 返回按鈕 */}
        <div className="mb-lg-7 mb-5">
          <button className="btn back-link" onClick={() => navigate("/subscription")}>
            <IconArrowLeft size={20} />
            返回方案選擇
          </button>
        </div>

        {/* 結帳卡片 */}
        <div className="checkout-card">
          {/* 訂單摘要 */}
          <OrderSummary planName={planName} price={price} />

          {/* 付款表單 */}
          <PaymentForm amount={price} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
