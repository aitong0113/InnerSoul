// src/component/Button.jsx

function Button({ text = '按鈕', onClick, variant = 'primary' }) {
  return (
    <button
      type="button"
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;