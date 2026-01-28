import './faq.scss';
import FAQItem from './FAQItem';

export default function FAQList() {
  return (
    <section className="bg-liner faq">
      <div className="container py-11">
        <h2 className="mb-8">常見問題</h2>

        <div className="faq-list">
          <FAQItem
            question="心途需要付費嗎？"
            answer="心途的核心功能可部分免費使用；若你希望獲得更多深度陪伴（如完整語音陪伴聆聽、不限次數心情日記..等），歡迎查看我們的訂閱方案，選擇最適合你的方式繼續前進。"
          />
          <FAQItem
            question="我可以寫日記嗎？還是只能語音？"
            answer="你可以自由選擇文字日記或語音陪伴，心途提供彈性的書寫與記錄方式。"
          />
          <FAQItem
            question="我的資料會被保存嗎？隱私是否安全？"
            answer="請放心，你的日記與使用紀錄僅用於個人回顧與服務功能優化，系統會以隱私與安全為優先，不會在未經同意的情況下對外分享。"
          />
        </div>
      </div>
    </section>
  );
}