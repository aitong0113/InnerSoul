import Card from "../../components/common/Card/Card";
import LoginForm from "../../components/auth/LoginForm";

function Login() {
  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <Card>
        <h2 className="text-center">登入</h2>
        <LoginForm />
      </Card>
    </div>
  );
}

export default Login;
