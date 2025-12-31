import { useState } from "react";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 之後接 API 就用這包
    const formData = {
      email,
      password,
    };

    console.log("Sign Up Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
};
export default SignUpForm;