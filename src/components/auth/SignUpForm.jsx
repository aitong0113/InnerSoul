import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { signUp, login } from "../../services/auth/authService";
import { authStore } from "../../services/auth/authStore";
import "../../pages/auth/auth.scss";

function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;

    if (!userName) newErrors.userName = "請輸入使用者名稱";
    if (!email) newErrors.email = "請輸入 Email";
    if (!password) {
      newErrors.password = "請輸入密碼";
    } else if (!passwordRule.test(password)) {
      newErrors.password = "密碼需為 6-12 位英數字，且至少包含 1 個字母與 1 個數字";
    }
    if (!password2) {
      newErrors.password2 = "請再次輸入密碼";
    } else if (password !== password2) {
      newErrors.password2 = "兩次輸入的密碼不一致";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      const DEFAULT_PROFILE = {
        userImg: "小兔.png",
        plan: "free",
      };
      await signUp({ userName, email, password, ...DEFAULT_PROFILE });
      const res = await login({ email, password });
      authStore.setAuth({
        accessToken: res.accessToken,
        userId: res.user.id,
        userName: res.user.userName,
        userImg: res.user.userImg,
        plan: res.user.plan,
        days: 3,
      });
      navigate(ROUTES.home);
    } catch (err) {
      console.error("註冊失敗", err);
      alert("註冊失敗");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-row">
        <label className="auth-label">使用者名稱</label>
        <input
          type="text"
          className="auth-input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="請輸入您的暱稱"
        />
      </div>
      {errors.userName && <small className="auth-error">{errors.userName}</small>}

      <div className="auth-row">
        <label className="auth-label">帳號</label>
        <input
          type="email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="請輸入您的 Email"
        />
      </div>
      {errors.email && <small className="auth-error">{errors.email}</small>}

      <div className="auth-row">
        <label className="auth-label">密碼</label>
        <input
          type="password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="請輸入6-12位英數字"
        />
      </div>
      {errors.password && <small className="auth-error">{errors.password}</small>}

      <div className="auth-row">
        <label className="auth-label">再輸入密碼</label>
        <input
          type="password"
          className="auth-input"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="請再次輸入密碼"
        />
      </div>
      {errors.password2 && <small className="auth-error">{errors.password2}</small>}

      <div className="auth-action-row">
        <div></div> {/* 佔位用，對齊 label */}
        <button type="submit" className="auth-btn">
          註冊
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
