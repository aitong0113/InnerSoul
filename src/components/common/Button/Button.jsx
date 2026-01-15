// src/component/Button.jsx

function Button({ text = "按鈕", onClick, imgUrl = "imgUrl" }) {
  return (
    <div>
      <button
        type="button"
        className={`btn fs-4 fw-bold border-0`}
        onClick={onClick}
        style={{ position: "relative" }}
      >
        <img src={imgUrl} alt="" />
        <p
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {text}
        </p>
      </button>
    </div>
  );
}

export default Button;
