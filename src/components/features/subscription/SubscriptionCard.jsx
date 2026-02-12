import { useNavigate } from "react-router-dom";
import { IconCheck, IconX } from "@tabler/icons-react";
import "./subscription.scss";

const SubscriptionCard = ({
  id,
  title,
  subtitle,
  price,
  currency,
  frequency,
  isRecommended,
  buttonText,
  features,
  userPlan
}) => {

  const navigate = useNavigate();

  const planMapping = {
    "free": "plan_free",
    "pro": "plan_pro"
  };


  const isCurrentPlan = planMapping[userPlan] === id;
  const isIncluded = userPlan === "pro" && id === "plan_free";


  let displayButtonText = buttonText;
  if (isCurrentPlan) {
    displayButtonText = "目前方案";
  } else if (isIncluded) {
    displayButtonText = "已包含";
  }


  const isDisabled = isCurrentPlan || isIncluded;

  const handleSubscribe = () => {

    if (!isDisabled) {


      if (!userPlan) {
        navigate("/signup", {
          state: { redirectToCheckout: id === "plan_pro", planId: id }
        });
        return;
      }

      if (id === "plan_pro") {
        navigate("/checkout", {
          state: {
            planId: id,
            planName: title,
            price: price
          }
        });
      } else {
        console.log("Already on free plan");
      }
    }
  };

  return (
    <div className={`subscription-card ${isRecommended ? "highlight" : ''}`}>
      {/* 推薦標籤 Badge */}
      {isRecommended && <div className="badge bg-primary-04">超值享受</div>}

      <div className="card-header-area">
        <h3 className="title mb-0 py-2">{title}</h3>
        <p className="card-subtitle mb-0 py-4">{subtitle}</p>

        <div className="price-container text-black-800">
          {price === 0 ? (
            <span className="free-text text-black-800">免費</span>
          ) : (
            <>
              <span className="currency">{currency}</span>
              <span className="amount">{price}</span>
              <span className="freq">{frequency}</span>
            </>
          )}
        </div>
      </div>

      <ul className="feature-list">
        {features.map((item, index) => (
          <li
            key={index}
            className={item.included ? "included" : "excluded"}
          >
            <span className="icon-wrapper">
              {item.included ? <IconCheck size={24} /> : <IconX size={24} />}
            </span>
            <span className="text">{item.text}</span>
          </li>
        ))}
      </ul>

      {/* 按鈕區塊 */}
      <div className="action-area pt-4 w-100 mt-auto">
        <button
          className={`card-action-btn ${isRecommended ? "mode-solid" : "mode-outline"}`}
          disabled={isDisabled}
          style={isDisabled ? {
            background: "#E0E0E0",
            borderColor: "#E0E0E0",
            color: "#9E9E9E",
            cursor: "default",
            boxShadow: "none",
            transform: "none"
          } : {}}
          onClick={handleSubscribe}
        >
          {displayButtonText}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;