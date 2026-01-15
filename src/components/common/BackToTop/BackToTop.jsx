// src/components/common/BackToTop/BackToTop.jsx
import './BackToTop.css';

export default function BackToTop() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className="back-to-top"
      onClick={handleClick}
      aria-label="Back to top"
    >
      <span className="back-to-top__icon"><i className="bi bi-chevron-up"></i></span>
      <span className="back-to-top__text">Top</span>
    </button>
  );
}