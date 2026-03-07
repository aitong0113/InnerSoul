import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  IconX,
  IconCreditCard,
  IconLock,
  IconAlertCircle,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import "./subscription.scss";

const isValidLuhn = (val) => {
  if (!val) return false;
  const digits = val.replace(/\s/g, "");
  if (digits.length < 13) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i));
    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

const cardSchema = z.object({
  cardName: z.string().min(1, "請輸入持卡人姓名"),
  cardNumber: z
    .string()
    .min(19, "信用卡號碼長度不足")
    .regex(/^(\d{4} ){3}\d{4}$/, "格式錯誤")
    .refine((val) => isValidLuhn(val), "無效的信用卡號碼"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2]) \/ \d{2}$/, "格式錯誤 (MM / YY)")
    .refine((val) => {
      if (!val) return false;
      const [monthStr, yearStr] = val.split(" / ");
      const inputMonth = parseInt(monthStr, 10);
      const inputYear = parseInt(yearStr, 10) + 2000;
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();
      if (inputYear < currentYear) return false;
      if (inputYear === currentYear && inputMonth < currentMonth) return false;
      return true;
    }, "卡片已過期"),
  cvc: z.string().regex(/^\d{3,4}$/, "格式錯誤 (3碼數字)"),
});

const getCardBrand = (number) => {
  const digits = number.replace(/\s/g, "");
  if (digits.startsWith("4")) return "Visa";
  if (/^5[1-5]/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "Amex";
  return "信用卡";
};

const ChangeCardModal = ({ onClose, onCardUpdated }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(cardSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    // 模擬 API 呼叫
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 通知父元件更新卡片資訊
    if (onCardUpdated) {
      const digits = data.cardNumber.replace(/\s/g, "");
      onCardUpdated({
        brand: getCardBrand(data.cardNumber),
        last4: digits.slice(-4),
      });
    }

    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleQuickFill = () => {
    setValue("cardName", "悠悠", { shouldValidate: true });
    setValue("cardNumber", "5555 5555 5555 4444", { shouldValidate: true });
    const nextYear = new Date().getFullYear() + 1 - 2000;
    setValue("expiry", `06 / ${nextYear}`, { shouldValidate: true });
    setValue("cvc", "456", { shouldValidate: true });
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setValue("cardNumber", formatted, { shouldValidate: true });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 4);
    if (value.length >= 2) {
      value = `${value.substring(0, 2)} / ${value.substring(2)}`;
    }
    setValue("expiry", value, { shouldValidate: true });
  };

  const handleCvcChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 4);
    setValue("cvc", value, { shouldValidate: true });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content bg-white rounded-4 change-card-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header px-md-8 px-5">
          <h3 className="modal-title">
            <IconCreditCard size={22} />
            變更付款信用卡
          </h3>
          <button className="close-btn" onClick={onClose}>
            <IconX size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body px-md-8 px-5">
          {isSuccess ? (
            <div className="text-center py-5">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                style={{
                  width: "72px",
                  height: "72px",
                  backgroundColor: "#E0F2F1",
                }}
              >
                <IconCircleCheckFilled size={36} style={{ color: "#398C9F" }} />
              </div>
              <h4 className="fw-bold mb-2">信用卡已更新</h4>
              <p className="text-secondary small">下次扣款將使用新的信用卡資訊</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-secondary small">請輸入新的信用卡資訊</span>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                  onClick={handleQuickFill}
                  style={{ fontSize: "0.8rem", padding: "0.25rem 0.5rem" }}
                >
                  快速填入
                </button>
              </div>

              <div className="card-form-body">
                {/* 卡號 */}
                <div className="mb-3">
                  <label>卡號</label>
                  <input
                    type="text"
                    className={`form-control ${errors.cardNumber ? "is-invalid" : ""}`}
                    placeholder="0000 0000 0000 0000"
                    maxLength="19"
                    {...register("cardNumber")}
                    onChange={handleCardNumberChange}
                  />
                  {errors.cardNumber && (
                    <div className="invalid-feedback d-flex align-items-center gap-1">
                      <IconAlertCircle size={14} /> {errors.cardNumber.message}
                    </div>
                  )}
                </div>

                <div className="row">
                  {/* 到期日 */}
                  <div className="col-6 mb-3">
                    <label>到期日</label>
                    <input
                      type="text"
                      className={`form-control ${errors.expiry ? "is-invalid" : ""}`}
                      placeholder="MM / YY"
                      maxLength="7"
                      {...register("expiry")}
                      onChange={handleExpiryChange}
                    />
                    {errors.expiry && (
                      <div className="invalid-feedback">{errors.expiry.message}</div>
                    )}
                  </div>

                  {/* CVC */}
                  <div className="col-6 mb-3">
                    <label>CVC / 安全碼</label>
                    <input
                      type="text"
                      className={`form-control ${errors.cvc ? "is-invalid" : ""}`}
                      placeholder="123"
                      maxLength="4"
                      {...register("cvc")}
                      onChange={handleCvcChange}
                    />
                    {errors.cvc && <div className="invalid-feedback">{errors.cvc.message}</div>}
                  </div>
                </div>

                {/* 持卡人姓名 */}
                <div className="mb-3">
                  <label>持卡人姓名</label>
                  <input
                    type="text"
                    className={`form-control ${errors.cardName ? "is-invalid" : ""}`}
                    placeholder="請輸入持卡人姓名"
                    {...register("cardName")}
                  />
                  {errors.cardName && (
                    <div className="invalid-feedback">{errors.cardName.message}</div>
                  )}
                </div>

                <div className="secure-note">
                  <IconLock size={14} />
                  您的付款資訊受到 SSL 安全加密保護
                </div>
              </div>

              <button
                type="submit"
                className="btn rounded-pill w-100 py-3 fw-bold mt-7 custom-btn-filled"
                disabled={isSubmitting}
              >
                {isSubmitting ? "儲存中..." : "儲存信用卡資料"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeCardModal;
