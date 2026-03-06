import { useState } from "react";
import { IconAlertCircle, IconX, IconCircleCheckFilled } from "@tabler/icons-react";
import "./subscription.scss";

const SubscriptionCancelModal = ({ onClose, onConfirm, isProcessing }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirm = async () => {
    await onConfirm();
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="modal-overlay" onClick={!isSuccess ? onClose : undefined}>
      <div
        className="modal-content bg-white rounded-4 cancel-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header px-md-8 px-5">
          <h3 className="modal-title">
            {isSuccess ? "取消完成" : "取消訂閱"}
          </h3>
          {!isSuccess && (
            <button className="close-btn" onClick={onClose}>
              <IconX size={24} />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="modal-body px-md-8 px-5 text-center">
          {isSuccess ? (
            <>
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#E0F2F1",
                }}
              >
                <IconCircleCheckFilled size={40} style={{ color: "#398C9F" }} />
              </div>

              <h4 className="fw-bold mb-3 text-dark">訂閱已取消</h4>

              <p className="text-secondary mb-0 lh-lg" style={{ fontSize: "0.95rem" }}>
                您的深度陪伴會員權益將保留至
                <br />
                本次計費週期結束為止
              </p>
            </>
          ) : (
            <>
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#FFF3E0",
                }}
              >
                <IconAlertCircle size={40} style={{ color: "#E65100" }} />
              </div>

              <h4 className="fw-bold mb-3 text-dark">確定要取消訂閱嗎？</h4>

              <p className="text-secondary mb-0 lh-lg" style={{ fontSize: "0.95rem" }}>
                取消後，您將在本次週期結束後恢復為
                <br />
                <span className="fw-bold text-dark">輕量體驗會員</span>
                <br />
                您確定要放棄目前的完整方案嗎？
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        {!isSuccess && (
          <div className="modal-footer flex-column gap-2">
            <button
              className="confirm-btn"
              onClick={onClose}
              disabled={isProcessing}
            >
              我再考慮一下
            </button>

            <button
              className="btn btn-link text-secondary text-decoration-none small"
              onClick={handleConfirm}
              disabled={isProcessing}
            >
              {isProcessing ? "處理中..." : "是的，我要取消訂閱"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCancelModal;

