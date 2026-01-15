// 未使用

function Card({ title, children }) {
  return (
    <div className="card mb-3">
      {title && <div className="card-header">{title}</div>}

      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
