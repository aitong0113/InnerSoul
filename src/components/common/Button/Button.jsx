import { useState } from "react";

// src/components/common/Button/Button.jsx
function Button({ text = "按鈕", onClick, imgUrl }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      className={`btn fs-4 fw-bold border-0 btn-cloud ${isHovered ? "is-hovered" : ""}`}
      onClick={onClick}
      style={{ position: "relative" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div className="btn-content-wrapper">
        {/* 背景圖 */}
        {imgUrl && <img src={imgUrl} alt="" aria-hidden="true" />}

        {/* 中央文字 */}
        <span
          className="btn-text"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        >
          {text}
        </span>
      </div>
    </button>
  );
}

export default Button;
