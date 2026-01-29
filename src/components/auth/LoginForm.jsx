import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { login } from "../../services/auth/authService";
import { authStore } from "../../services/auth/authStore";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
        days: 3,
      });
      alert("登入成功！");
      navigate(ROUTES.home);
    } catch (err) {
      alert("帳號或密碼錯誤，請再試一次");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
          }}
          placeholder="請輸入6-12位英數字"
        />
        {errors.password && <small className="text-danger">{errors.password}</small>}
      </div>

      <button type="submit" className="btn btn-primary">
        登入
      </button>
    </form>
  );
}
export default LoginForm;
