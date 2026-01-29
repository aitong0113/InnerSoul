import { useState } from 'react';
import { IconPlus, IconMinus } from '@tabler/icons-react';

export default function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? 'is-open' : ''}`}>
      <div
        className="faq-question"
        onClick={() => setOpen(!open)}
      >
        <span>{question}</span>
        <span className="icon">
          {open ? <IconMinus size={24} /> : <IconPlus size={24} />}
        </span>
      </div>

      <div className="faq-answer">
        {answer}
      </div>
    </div>
  );
}