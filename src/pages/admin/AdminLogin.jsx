import "./admin-login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MOCK_ADMIN = {
  email: "admin@innersoul.com",
  password: "123456",
  token: "inner-soul-admin-token",
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
      // ✅ 存 token
      localStorage.setItem("adminToken", MOCK_ADMIN.token);

      // ✅ 導到後台
      navigate("/admin", { replace: true });
    } else {
      setError("帳號或密碼錯誤");
    }
  };

  return (
    <div className="admin-login-page bg-liner">
      <div className="admin-login-card">
        <h1 className="title">後台管理登入</h1>
        <p className="subtitle">Inner Soul Admin</p>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label>
            帳號
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@innersoul.com"
              required
            />
          </label>

          <label>
            密碼
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="請輸入密碼"
              required
            />
          </label>

          {error && <p className="error">{error}</p>}

          {/* ✅ 只保留 submit */}
          <button type="submit" className="login-btn">
            登入後台
          </button>
        </form>

        <p className="hint">本系統僅限管理人員使用</p>
      </div>
    </div>
  );
}
