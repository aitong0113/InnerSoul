import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { signUp, login } from "../../services/auth/authService";
import { authStore } from "../../services/auth/authStore";

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
      alert("註冊失敗");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>使用者名稱</label>
        <input
          type="text"
          className="form-control"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            if (errors.userName) setErrors((prev) => ({ ...prev, userName: "" }));
          }}
          placeholder="請輸入您的暱稱"
        />
        {errors.userName && <small className="text-danger">{errors.userName}</small>}
      </div>

      <div className="mb-3">
        <label>帳號</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
          }}
          placeholder="請輸入您的 Email"
        />
        {errors.email && <small className="text-danger">{errors.email}</small>}
      </div>

      <div className="mb-3">
        <label>密碼</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => {
            const v = e.target.value;
            setPassword(v);
            if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
            if (errors.password2 && password2 && password2 === v) {
              setErrors((prev) => ({ ...prev, password2: "" }));
            }
          }}
          placeholder="請輸入6-12位英數字"
        />
        {errors.password && <small className="text-danger">{errors.password}</small>}
      </div>

      <div className="mb-3">
        <label>再次輸入密碼</label>
        <input
          type="password"
          className="form-control"
          value={password2}
          onChange={(e) => {
            setPassword2(e.target.value);
            if (errors.password2) setErrors((prev) => ({ ...prev, password2: "" }));
          }}
          placeholder="請再次輸入密碼"
        />
        {errors.password2 && <small className="text-danger">{errors.password2}</small>}
      </div>

      <button type="submit" className="btn btn-primary">
        註冊
      </button>
    </form>
  );
}
export default SignUpForm;
