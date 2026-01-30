import { IconX, IconInfoCircleFilled } from '@tabler/icons-react';

const SubscriptionTermsModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content bg-white rounded-4" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">
            訂閱條款與注意事項
          </h3>
          <button className="close-btn" onClick={onClose}>
            <IconX size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="modal-body">
          {/* Info Box */}
          <div className="info-box">
            <div>
              <IconInfoCircleFilled size={20} className="info-icon"/>
            </div>
            <div className="info-text">
              <h4 className="info-title">非醫療行為聲明</h4>
              <p>
                心途 InnerSoul 提供的所有內容（含語音、心情日記等）僅作為情緒陪伴與紓壓輔助，
                <strong>並非心理諮商或醫療行為</strong>。若您正處於急性情緒危機或有嚴重心理困擾，
                請務必尋求專業醫師或諮商師的協助。
              </p>
            </div>
          </div>

          <div className="terms-section">
            <h4>1. 訂閱與自動續費</h4>
            <ul>
              <li>您的訂閱將以<strong>月</strong>為單位自動續期，費用將於每個計費週期開始時從您指定的付款方式扣除。</li>
              <li>取消訂閱需於下期訂閱扣款日 24 小時前取消訂閱，若未取消則視為同意自動續約。</li>
            </ul>
          </div>

          <div className="terms-section">
            <h4>2. 取消政策</h4>
            <ul>
              <li>您可以隨時透過「帳號管理」頁面取消訂閱。</li>
              <li>取消後，您的會員權益將保留至<strong>當前計費週期結束</strong>為止。</li>
              <li>週期結束後，系統將不再自動扣款，您的帳號將轉為免費會員狀態。</li>
            </ul>
          </div>

          <div className="terms-section">
            <h4>3. 退款說明</h4>
            <ul>
              <li>由於數位內容服務的即時性，一經訂閱生效，當期費用<strong>不予退還</strong>。</li>
              <li>若有重複扣款或系統錯誤導致的費用，請於 7 日內聯繫客服處理。</li>
            </ul>
          </div>

          <div className="terms-section">
            <h4>4. 隱私權保護</h4>
            <p>
              您的心情日記與使用數據皆經過加密處理，我們嚴格遵守隱私權政策，絕不會在未經授權下將您的個人資料洩漏給第三方。
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="confirm-btn" onClick={onClose}>
            我了解了
          </button>
        </div>

      </div>
    </div>
  );
};

export default SubscriptionTermsModal;