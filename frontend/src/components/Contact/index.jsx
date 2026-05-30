import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EnvelopeSimpleIcon as EnvelopeSimple, ClockIcon as Clock,
  MapPinIcon as MapPin, WarningIcon as Warning,
} from "@phosphor-icons/react";
import { useContact } from "../../hooks/useContact";
import "./index.css";

const INFO = [
  { Icon: EnvelopeSimple, label: "Email",         value: "hello@resumeiq.com", color: "#00c896" },
  { Icon: Clock,          label: "Response Time", value: "Within 24 hours",    color: "#00A3FF" },
  { Icon: MapPin,         label: "Location",      value: "Hyderabad, India",   color: "#8b5cf6" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { mutate: sendMessage, isPending, error, isSuccess, reset } = useContact();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(form);
  };

  const handleReset = () => {
    reset();
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-bg-orbs">
        <div className="contact-orb contact-orb-1" />
        <div className="contact-orb contact-orb-2" />
      </div>

      <motion.div
        className="contact-container"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="contact-header">
          <p className="contact-tag">Get in Touch</p>
          <h1 className="contact-title">
            We'd Love to <span className="gradient-text">Hear From You</span>
          </h1>
          <p className="contact-sub">
            Have a question, feedback, or just want to say hello? Fill out the form and we'll get back to you shortly.
          </p>
        </div>

        <div className="contact-card">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                className="success-state"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="success-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                >
                  ✓
                </motion.div>
                <h2>Message Sent Successfully!</h2>
                <p>
                  Thanks for reaching out, <strong>{form.name}</strong>.
                  We'll reply to <strong>{form.email}</strong> within 24 hours.
                </p>
                <motion.button
                  className="contact-btn"
                  onClick={handleReset}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {error && (
                  <motion.div
                    className="contact-error"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Warning size={15} weight="fill" style={{ marginRight: 6 }} />
                    {error.message}
                  </motion.div>
                )}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text" id="name" name="name"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email" id="email" name="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message" name="message"
                    placeholder="Tell us what's on your mind..."
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="contact-btn"
                  disabled={isPending}
                  whileHover={!isPending ? { scale: 1.03, y: -2 } : {}}
                  whileTap={!isPending ? { scale: 0.97 } : {}}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  {isPending ? "Sending..." : "Send Message →"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="contact-info-strip">
          {INFO.map(({ Icon, label, value, color }, i) => (
            <motion.div
              className="info-item"
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -3 }}
            >
              <span className="info-icon">
                <Icon size={20} weight="duotone" color={color} />
              </span>
              <div>
                <p className="info-label">{label}</p>
                <p className="info-value">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;