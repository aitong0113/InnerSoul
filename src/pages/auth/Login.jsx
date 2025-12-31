import Card from "../../components/common/Card/Card";
import SignUpForm from "../../components/auth/SignUpForm";

const Login = () => {
  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <Card>
        <h2>Login</h2>
        <SignUpForm />
      </Card>
    </div>
  );
};

export default Login;
