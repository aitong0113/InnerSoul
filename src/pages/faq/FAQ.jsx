// pages/faq/FAQ.jsx
import FAQList from "../../components/features/faq/FAQList";
import { faqData } from "../../components/features/faq/faqData";
import "./faq.scss";

export default function FAQPage() {
  return (
    <main className="faq-page bg-BG-01">
      {/* 標題區 */}
      <section className="container">
        <h2 className="text-center fw-bold fs-1 text-primary-05 mb-0">常見問題</h2>
        <p className="fs-5 text-center text-black-700 mb-2 my-7">
          如果你對心途的使用方式、功能或方案有任何疑問，
        </p>
        <p className="fs-5 text-center text-black-700 mb-2">
          這裡整理了常見的問題與說明，陪你一步步釐清方向，
        </p>
        <p className="fs-5 text-center text-black-700">希望能幫助你更安心、也更自在地開始使用。</p>
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
