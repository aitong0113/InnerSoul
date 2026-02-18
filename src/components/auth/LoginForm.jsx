import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { login } from "../../services/auth/authService";
import { authStore } from "../../services/auth/authStore";
import "../../pages/auth/auth.scss";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function fillPaidUser() {
    setEmail("sad@gmail.com");
    setPassword("sad111");
  }

  function fillFreeUser() {
    setEmail("happy@gmail.com");
    setPassword("happy111");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    if (!email) newErrors.email = "請輸入 Email";
    if (!password) newErrors.password = "請輸入密碼";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      const res = await login({ email, password });
      authStore.setAuth({
        accessToken: res.accessToken,
        userId: res.user.id,
        userName: res.user.userName,
        userImg: res.user.userImg,
        plan: res.user.plan,
        days: 3,
      });
      alert("登入成功！");
      navigate(ROUTES.home);
    } catch (err) {
      console.error("登入失敗", err);
      alert("登入失敗，請再試一次");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-test-section">
        <p className="auth-test-title">測試帳號</p>

        <div className="auth-test-row">
          <button type="button" className="auth-test-btn" onClick={fillPaidUser}>
            付費會員（悠悠）
          </button>

          <button type="button" className="auth-test-btn" onClick={fillFreeUser}>
            免費會員（黑皮）
          </button>
        </div>
      </div>
      <div className="auth-row">
        <label className="auth-label">帳號</label>
        <input
          type="email"
          className="auth-input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
          }}
          placeholder="請輸入您的 Email"
        />
        {errors.email && <small className="text-danger">{errors.email}</small>}
      </div>
      <div className="auth-row">
        <label className="auth-label">密碼</label>
        <input
          type="password"
          className="auth-input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
          }}
          placeholder="請輸入6-12位英數字"
        />
        {errors.password && <small className="text-danger">{errors.password}</small>}
      </div>

      <div className="auth-action-row">
        <button type="button" className="auth-forgot">
          忘記密碼
        </button>
        <button type="submit" className="auth-btn">
          登入
        </button>
      </div>
    </form>
  );
}
export default LoginForm;
