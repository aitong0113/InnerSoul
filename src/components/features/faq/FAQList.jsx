// FAQList.jsx
import FAQItem from "./FAQItem";
import "./faq.scss";

export default function FAQList({ data = [] }) {
  return (
    <div className="faq-list mb-lg-11 mb-7">
      {data.map((item) => (
        <FAQItem key={item.id} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
