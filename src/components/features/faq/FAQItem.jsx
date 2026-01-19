import { useState } from 'react';

export default function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? 'is-open' : ''}`}>
      <div
        className="faq-question"
        onClick={() => setOpen(!open)}
      >
        <span>{question}</span>
        <span className="icon">⌄</span>
      </div>

      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
}