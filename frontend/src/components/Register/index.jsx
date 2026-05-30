import { useNavigate, Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserPlus as UserPlusIcon, 
  WarningIcon as Warning,
  CheckCircleIcon as CheckCircle,
  RocketLaunchIcon as Rocket
} from "@phosphor-icons/react";
import "./index.css";

const Register = () => {
  const navigate = useNavigate();
  const { mutate: register, isPending, error, isSuccess } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = Object.fromEntries(new FormData(e.target));
    register(
      { name, email, password },
      { onSuccess: () => setTimeout(() => navigate("/login"), 2000) }
    );
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
              <Rocket size={32} weight="fill" color="#00A3FF" />
            </div>
            <h2>Supercharge Your Career.</h2>
            <p>Join ResumeIQ to discover the gaps in your resume, align with top job descriptions, and unlock your true potential.</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="auth-form-side">
          <div className="auth-form-header">
            <h3>Create Account</h3>
            <p>Start optimizing your resume today.</p>
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
                <span>{error.message || "Failed to register."}</span>
              </motion.div>
            )}
            {isSuccess && (
              <motion.div 
                className="msg-success"
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
              >
                <CheckCircle size={20} weight="fill" />
                <span>Registration successful! Redirecting to login...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input id="name" type="text" name="name" placeholder="John Doe" required />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" name="email" placeholder="john@example.com" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" placeholder="••••••••" required minLength="6" />
            </div>

            <button type="submit" className="btn-auth-submit" disabled={isPending || isSuccess}>
              {isPending ? (
                <>
                  <span className="spinner" style={{ width: 18, height: 18 }} />
                  Signing Up...
                </>
              ) : (
                <>
                  Create Account
                  <UserPlusIcon size={20} weight="bold" />
                </>
              )}
            </button>
          </form>

          <div className="auth-switch">
            Already have an account? <Link to="/login">Sign in here</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;