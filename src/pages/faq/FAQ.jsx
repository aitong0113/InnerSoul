// pages/faq/FAQ.jsx
import FAQList from '../../components/features/faq/FAQList';
import { faqData } from '../../components/features/faq/faqData';
import './faq.scss';

export default function FAQPage() {
  return (
    <main className="faq-page bg-BG-01">
      {/* 標題區 */}
      <section className="container mt-5 py-11">
        <h1 className="faq-page-title text-center fw-bold text-primary-05 pb-5">
          常見問題
        </h1>
        <p className="text-center text-black-700 mb-2">
          如果你對心途的使用方式、功能或方案有任何疑問，
        </p>
        <p className="text-center text-black-700 mb-2">
          這裡整理了常見的問題與說明，陪你一步步釐清方向，
        </p>
        <p className="text-center text-black-700">
          希望能幫助你更安心、也更自在地開始使用。
        </p>
      </section>

      {/* FAQ 列表區（背景雲） */}
      <section className="faq-section bg-liner">
        <div className="container">
          <FAQList data={faqData} />
        </div>
      </section>
    </main>
  );
}