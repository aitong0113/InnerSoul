import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconConfetti } from "@tabler/icons-react";
import "./checkout.scss";

const PaymentSuccessModal = ({ orderId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/playlist", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="checkout-modal-overlay">
      <div className="success-card fade-in-up">
        <div className="icon-wrapper">
          <IconConfetti size={40} stroke={1.5} color="#398C9F" />
        </div>
        <h3 className="fw-bold mb-3 mt-4 text-dark">訂閱成功</h3>
        <p className="text-secondary mb-1">歡迎加入 InnerSoul 深度陪伴會員</p>
        <p className="text-secondary mb-4">你的旅程，從此刻開始展開</p>
        <div className="order-id-tag">訂單編號：#{orderId}</div>
        <div className="mt-4 text-muted small">3 秒後自動跳轉...</div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
