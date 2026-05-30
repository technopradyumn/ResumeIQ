import { useNavigate, Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SignIn as LogInIcon, 
  WarningIcon as Warning,
  SparkleIcon as Sparkle 
} from "@phosphor-icons/react";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.target));
    login({ email, password }, { onSuccess: () => navigate("/your-resumes") });
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-glow" />
      <div className="auth-bg-glow-2" />

      <motion.div 
        className="auth-split-card"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Graphic Side */}
        <div className="auth-graphic">
          <div className="auth-graphic-content">
            <div className="auth-graphic-icon">
              <Sparkle size={32} weight="fill" color="#00c896" />
            </div>
            <h2>Welcome Back to ResumeIQ.</h2>
            <p>Sign in to continue analyzing your resumes, boosting your ATS compatibility, and landing your dream job.</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="auth-form-side">
          <div className="auth-form-header">
            <h3>Sign In</h3>
            <p>Access your dashboard and resume history.</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                className="msg-error"
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              >
                <Warning size={20} weight="fill" />
                <span>{error.message || "Failed to log in."}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" name="email" placeholder="john@example.com" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" placeholder="••••••••" required />
            </div>

            <button type="submit" className="btn-auth-submit" disabled={isPending}>
              {isPending ? (
                <>
                  <span className="spinner" style={{ width: 18, height: 18 }} />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <LogInIcon size={20} weight="bold" />
                </>
              )}
            </button>
          </form>

          <div className="auth-switch">
            Don't have an account yet? <Link to="/register">Create one</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;