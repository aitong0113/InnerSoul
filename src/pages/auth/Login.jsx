import LoginForm from "../../components/auth/LoginForm";

function Login() {
  return (
    <section className="auth-page bg-liner">
      <div className="auth-container">
        <h2 className="auth-title">登入</h2>
        <LoginForm />
      </div>
    </section>
  );
}
export default Login;
