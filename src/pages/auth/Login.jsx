import LoginForm from "../../components/auth/LoginForm";
import { motion } from "motion/react";
import { fadeIn } from "../../components/animation/motion";

function Login() {
  return (
    <section className="auth-page bg-liner">
      <motion.div className="auth-container" {...fadeIn()}>
        <h2 className="auth-title">登入</h2>
        <LoginForm />
      </motion.div>
    </section>
  );
}
export default Login;
