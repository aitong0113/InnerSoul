import Card from "../../components/common/Card/Card";
import SignUpForm from "../../components/auth/SignUpForm";

const SignUp = () => {
  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <Card>
        <h2 className="text-center">註冊</h2>
        <SignUpForm />
      </Card>
    </div>
  );
};

export default SignUp;
