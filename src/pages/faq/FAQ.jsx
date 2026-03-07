// pages/faq/FAQ.jsx
import FAQList from "../../components/features/faq/FAQList";
import { faqData } from "../../components/features/faq/faqData";
import "./faq.scss";

export default function FAQPage() {
  return (
    <main className="faq-page bg-BG-01">
      {/* 標題區 */}
      <section className="container">
        <h2 className="text-center text-primary-04 fw-bold mb-lg-6 fs-lg-2 fs-4 mb-5">常見問題</h2>
        <p className="fs-lg-5 text-center text-black-700 mb-2 lh-lg d-none d-lg-block">
          如果你對心途的使用方式、功能或方案有任何疑問，
          <br />
          這裡整理了常見的問題與說明，陪你一步步釐清方向，
          <br />
          希望能幫助你更安心、也更自在地開始使用。
        </p>
        <p className="text-center fs-lg-5 text-black-700 mb-2 d-md-block d-lg-none">
          如果你對心途的使用方式、功能或方案有任何疑問，這裡整理了常見的問題與說明。
          <br />
          陪你一步步釐清方向，
          <br />
          希望能幫助你更安心、也更自在地開始使用。
        </p>
      </section>

      {/* FAQ 列表區（背景雲） */}
      <section className="faq-section bg-liner py-lg-0 py-7">
        <div className="container">
          <FAQList data={faqData} />
        </div>
      </section>
    </main>
  );
}
