import SignUpForm from "../../components/auth/SignUpForm";
import "../../pages/auth/auth.scss";

const SignUp = () => {
  return (
    <section className="auth-page bg-liner">
      <div className="auth-container">
        <h2 className="auth-title">註冊</h2>
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUp;
