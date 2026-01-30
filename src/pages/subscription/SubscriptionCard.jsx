import { IconCheck, IconX } from '@tabler/icons-react';

const SubscriptionCard = ({ 
  title, 
  subtitle, 
  price, 
  currency,
  frequency,
  isRecommended, 
  buttonText, 
  features 
}) => {

return (
    <div className={`subscription-card ${isRecommended ? 'highlight' : ''}`}>
      {/* 推薦標籤 Badge */}
      {isRecommended && <div className="badge bg-primary-04">超值享受</div>}

      <div className="card-header-area">
        <h3 className="title mb-0 py-2">{title}</h3>
        <p className="subtitle mb-0 py-4">{subtitle}</p>
        
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
            className={item.included ? 'included' : 'excluded'}
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
          className={`card-action-btn ${isRecommended ? 'mode-solid' : 'mode-outline'}`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;