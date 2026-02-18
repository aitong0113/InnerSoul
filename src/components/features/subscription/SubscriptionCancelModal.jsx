import { IconAlertCircle } from "@tabler/icons-react";
import "./subscription.scss";

const SubscriptionCancelModal = ({ onClose, onConfirm, isProcessing }) => {
  return (
    <div className="subscription-modal-overlay" style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1050,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backdropFilter: "blur(2px)"
    }}>
      <div className="bg-white rounded-4 p-5 text-center shadow-lg" style={{ maxWidth: "400px", width: "90%" }}>

        {/* Icon */}
        <div className="mb-4 d-inline-flex align-items-center justify-content-center bg-light rounded-circle" style={{ width: "80px", height: "80px" }}>
          <IconAlertCircle size={40} className="text-secondary" />
        </div>

        <h3 className="fw-bold mb-5 text-dark">確定要取消訂閱嗎</h3>

        <p className="text-secondary mb-5 lh-base">
          取消後，您將在本次週期結束後恢復為<br />
          <span className="fw-bold text-dark">輕量體驗會員</span>
          <br />您確定要放棄目前的完整方案嗎？
        </p>

        <div className="d-flex flex-column gap-3">
          <button
            className="btn btn-primary-teal rounded-pill py-2 fw-bold"
            onClick={onClose}
            disabled={isProcessing}
          >
            我再考慮一下
          </button>

          <button
            className="btn btn-link text-secondary text-decoration-none small"
            onClick={onConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? "處理中..." : "是的，我要取消訂閱"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default SubscriptionCancelModal;