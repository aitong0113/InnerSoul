import SignUpForm from "../../components/auth/SignUpForm";
import "../../pages/auth/auth.scss";
import { motion } from "motion/react";
import { fadeIn } from "../../components/animation/motion";

const SignUp = () => {
  return (
    <section className="auth-page bg-liner">
      <motion.div className="auth-container" {...fadeIn()}>
        <h2 className="auth-title">註冊</h2>
        <SignUpForm />
      </motion.div>
    </section>
  );
};

export default SignUp;
