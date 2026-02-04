import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IconCreditCard, IconLock, IconAlertCircle } from "@tabler/icons-react";
import SubscriptionTermsModal from "../subscription/SubscriptionTermsModal";
import PaymentSuccessModal from "./PaymentSuccessModal";

const isValidLuhn = (val) => {
  if (!val) return false;
  const digits = val.replace(/\s/g, '');
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
  return (sum % 10) === 0;
};

const paymentSchema = z.object({
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
      const [monthStr, yearStr] = val.split(' / ');

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

const PaymentForm = ({ amount }) => {
  const [showModal, setShowModal] = useState(false);

  const [successData, setSuccessData] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(paymentSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    console.log("驗證通過，準備付款資料:", data);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    const mockOrderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSuccessData(mockOrderId);
  };

  // 一鍵填入資料
  const handleQuickFill = () => {
    setValue("cardName", "悠悠", { shouldValidate: true });
    setValue("cardNumber", "4242 4242 4242 4242", { shouldValidate: true });
    const nextYear = new Date().getFullYear() + 1 - 2000;
    setValue("expiry", `12 / ${nextYear}`, { shouldValidate: true });
    setValue("cvc", "123", { shouldValidate: true });
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setValue('cardNumber', formatted, { shouldValidate: true });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 4);

    if (value.length >= 2) {
      value = `${value.substring(0, 2)} / ${value.substring(2)}`;
    }
    setValue('expiry', value, { shouldValidate: true });
  };

  const handleCvcChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 4);
    setValue('cvc', value, { shouldValidate: true });
  }

  return (
    <>
      <div className="payment-form-section">
        {/* 標題區域 */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="section-title m-0">選擇付款方式</h4>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
            onClick={handleQuickFill}
            style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
          >
            快速填入
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="payment-selector">
            <div className="selector-header">
              <div className="d-flex align-items-center gap-2">
                <IconCreditCard size={24} />
                <span>信用卡 / 金融卡</span>
              </div>
              <div className="radio-circle">
                <div className="dot"></div>
              </div>
            </div>

            <div className="form-body">
              {/* 卡號欄位 */}
              <div className="mb-3">
                <label>卡號</label>
                <input
                  type="text"
                  className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
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
                {/* 到期日欄位 */}
                <div className="col-6 mb-3">
                  <label>到期日</label>
                  <input
                    type="text"
                    className={`form-control ${errors.expiry ? 'is-invalid' : ''}`}
                    placeholder="MM / YY"
                    maxLength="7"
                    {...register("expiry")}
                    onChange={handleExpiryChange}
                  />
                  {errors.expiry && (
                    <div className="invalid-feedback">
                      {errors.expiry.message}
                    </div>
                  )}
                </div>

                {/* CVC 欄位 */}
                <div className="col-6 mb-3">
                  <label>CVC / 安全碼</label>
                  <input
                    type="text"
                    className={`form-control ${errors.cvc ? 'is-invalid' : ''}`}
                    placeholder="123"
                    maxLength="4"
                    {...register("cvc")}
                    onChange={handleCvcChange}
                  />
                  {errors.cvc && (
                    <div className="invalid-feedback">
                      {errors.cvc.message}
                    </div>
                  )}
                </div>
              </div>

              {/* 持卡人姓名 */}
              <div className="mb-3">
                <label>持卡人姓名</label>
                <input
                  type="text"
                  className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                  placeholder="請輸入持卡人姓名"
                  {...register("cardName")}
                />
                {errors.cardName && (
                  <div className="invalid-feedback">
                    {errors.cardName.message}
                  </div>
                )}
              </div>

              <div className="secure-note">
                <IconLock size={14} />
                您的付款資訊受到 SSL 安全加密保護
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn d-flex justify-content-center align-items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "處理中..." : "確認付款並啟用方案"}
          </button>

          <div className="terms-note">
            點擊確認即代表您同意{' '}
            <button
              type="button"
              className="btn-link-style"
              onClick={() => setShowModal(true)}
            >
              訂閱條款與注意事項
            </button>
            ，您可以隨時取消訂閱。
          </div>
        </form>
      </div>

      {showModal && (
        <SubscriptionTermsModal onClose={() => setShowModal(false)} />)}
      {successData && (
        <PaymentSuccessModal orderId={successData} />
      )}
    </>
  );
};

export default PaymentForm;