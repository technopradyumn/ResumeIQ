import { useRef, useMemo, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  useInView,
  useSpring,
} from "framer-motion";
import {
  FileTextIcon as FileText, TargetIcon as Target, RobotIcon as Robot,
  KeyIcon as Key, LayoutIcon as Layout, LockIcon as Lock,
  FilesIcon as Files, CheckCircleIcon as CheckCircle,
  TrendUpIcon as TrendUp, StarIcon as Star,
  UploadSimpleIcon as UploadSimple, MagnifyingGlassIcon as MagnifyingGlass,
  PencilSimpleIcon as PencilSimple,
  TwitterLogoIcon as TwitterLogo, LinkedinLogoIcon as LinkedinLogo,
  GithubLogoIcon as GithubLogo,
  RocketIcon as Rocket, SparkleIcon as Sparkle,
  ArrowDownIcon as ArrowDown, CheckIcon as Check,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const AnimatedStat = ({ end, suffix = "", decimals = 0 }) => {
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => {
    const val = decimals > 0 ? parseFloat(v).toFixed(decimals) : Math.floor(v);
    return `${val}${suffix}`;
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    if (isInView) {
      const ctrl = animate(count, parseFloat(end), {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1],
      });
      return ctrl.stop;
    }
  }, [isInView, count, end]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const heroVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const CYCLING_WORDS = ["Beat the Bots", "Pass ATS Filters", "Land the Interview"];

const FEATURES = [
  { Icon: FileText, title: "Resume Parsing",        desc: "Extracts skills, experience, and education from your PDF resume." },
  { Icon: Target,   title: "ATS Scoring",           desc: "Compares your resume to job descriptions and returns an ATS compatibility score." },
  { Icon: Robot,    title: "AI Suggestions",        desc: "Personalized, actionable edits and bullet rewrites powered by an LLM." },
  { Icon: Key,      title: "Keyword Optimization",  desc: "Highlights missing keywords and suggests exactly where to add them." },
  { Icon: Layout,   title: "Format & Layout Tips",  desc: "Recommends resume sections and formatting to maximise parsing accuracy." },
  { Icon: Lock,     title: "Secure & Private",      desc: "Files are processed securely; your account keeps your data safe." },
];

const STEPS = [
  { Icon: UploadSimple,    num: "01", title: "Upload",  desc: "Drop a PDF of your resume into the analyser." },
  { Icon: MagnifyingGlass, num: "02", title: "Analyse", desc: "Get an ATS score, keyword matches, and AI suggestions instantly." },
  { Icon: PencilSimple,    num: "03", title: "Improve", desc: "Apply edits and re-run to maximise your chances." },
];

const SOCIALS = [
  { Icon: TwitterLogo,  href: "#", label: "Twitter" },
  { Icon: LinkedinLogo, href: "#", label: "LinkedIn" },
  { Icon: GithubLogo,   href: "#", label: "GitHub" },
];

const FOOTER_LINKS = [
  { heading: "Product", links: ["Resume Checker", "ATS Score", "AI Suggestions", "Pricing"] },
  { heading: "Company", links: ["About Us", "Blog", "Careers", "Press"] },
  { heading: "Support", links: ["Help Center", "Contact", "Privacy Policy", "Terms of Service"] },
];

const BENEFITS = [
  "Increase interview invites by optimising for ATS.",
  "Save time with instant scoring and rewrite suggestions.",
  "Improve clarity and impact of bullet points.",
  "Keep your personal data private and secure.",
];

const ANALYTICS = [
  { label: "ATS Parse Rate", val: 96, color: "#00c896" },
  { label: "Keyword Match",  val: 78, color: "#00A3FF" },
  { label: "Impact Score",   val: 82, color: "#8b5cf6" },
  { label: "Readability",    val: 91, color: "#f59e0b" },
];

const STATS = [
  { Icon: Files,       end: 50,  suffix: "K+", decimals: 0, label: "Resumes Analysed", color: "#00c896" },
  { Icon: CheckCircle, end: 93,  suffix: "%",  decimals: 0, label: "ATS Pass Rate",     color: "#00A3FF" },
  { Icon: TrendUp,     end: 3,   suffix: "×",  decimals: 0, label: "More Interviews",   color: "#8b5cf6" },
  { Icon: Star,        end: 4.9, suffix: "★",  decimals: 1, label: "User Rating",       color: "#f59e0b" },
];

const Home = () => {
  const navigate = useNavigate();
  const howRef      = useRef(null);
  const featuresRef = useRef(null);
  const heroRef     = useRef(null);

  const rawX  = useMotionValue(0);
  const rawY  = useMotionValue(0);
  const glowX = useSpring(rawX, { stiffness: 55, damping: 20 });
  const glowY = useSpring(rawY, { stiffness: 55, damping: 20 });

  const handleHeroMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) { rawX.set(e.clientX - rect.left); rawY.set(e.clientY - rect.top); }
  };

  const particles = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: `${4 + (i * 4.5) % 92}%`,
      y: `${6 + (i * 6.8) % 88}%`,
      size: 2 + (i % 3),
      delay: i * 0.25,
      duration: 4 + (i % 4) * 0.6,
      color: ["#00c896", "#00A3FF", "#8b5cf6"][i % 3],
    })), []);

  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIdx((n) => (n + 1) % CYCLING_WORDS.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="home-wrapper">
      <section className="hero" ref={heroRef} onMouseMove={handleHeroMouseMove}>
        <div className="hero-bg-orbs">
          <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
        </div>
        <div className="hero-grid-overlay" />

        <motion.div
          className="hero-cursor-glow"
          style={{ x: glowX, y: glowY, translateX: "-50%", translateY: "-50%" }}
        />

        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="particle"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size, background: p.color }}
            animate={{ opacity: [0, 0.55, 0], y: [0, -70], scale: [0, 1, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        <motion.div className="hero-content" variants={heroVariants} initial="hidden" animate="show">
          <motion.div className="hero-badge" variants={heroItem}>
            <Sparkle size={14} weight="fill" />
            AI-Powered Resume Analysis
            <span className="badge-dot" />
          </motion.div>

          <motion.h1 className="hero-h1" variants={heroItem}>
            Make Your Resume<br />
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                className="gradient-text"
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                exit={{    opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ display: "inline-block" }}
              >
                {CYCLING_WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.h1>

          <motion.p className="hero-sub" variants={heroItem}>
            Upload your resume, get an ATS score, and receive AI‑driven suggestions to make recruiters notice you.
          </motion.p>
          <motion.p className="hero-quote" variants={heroItem}>
            "A great resume opens doors; this tool ensures it gets past the first one."
          </motion.p>

          <motion.div className="hero-actions" variants={heroItem}>
            <motion.button
              className="btn-primary"
              onClick={() => navigate("/your-resumes")}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 18 }}
            >
              <span>Get Started — It's Free</span>
              <span className="btn-shine" />
            </motion.button>
            <motion.button
              className="btn-secondary"
              onClick={() => howRef.current?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.03, borderColor: "rgba(0,200,150,0.6)" }}
              whileTap={{ scale: 0.97 }}
            >
              See Demo <ArrowDown size={15} weight="bold" style={{ display: "inline", marginLeft: 4 }} />
            </motion.button>
          </motion.div>

          <motion.div
            className="score-card-tease"
            variants={heroItem}
            whileHover={{ y: -4, boxShadow: "0 28px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,200,150,0.15)" }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div className="score-ring">
              <svg viewBox="0 0 80 80" className="ring-svg">
                <circle cx="40" cy="40" r="34" className="ring-bg" />
                <circle cx="40" cy="40" r="34" className="ring-fill" />
              </svg>
              <div className="score-number">72</div>
            </div>
            <div className="score-details">
              <div className="score-label">ATS Score</div>
              {[
                { label: "Keywords", pct: 68 },
                { label: "Format",   pct: 84 },
                { label: "Content",  pct: 55 },
              ].map(({ label, pct }) => (
                <div className="score-bar-row" key={label}>
                  <span>{label}</span>
                  <div className="mini-bar"><div className="mini-fill" style={{ width: `${pct}%` }} /></div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          {STATS.map(({ Icon, color, label, ...stat }, i) => (
            <motion.div
              className="stat-item"
              key={i}
              {...reveal(i * 0.1)}
              whileHover={{ background: "rgba(0,200,150,0.05)", scale: 1.02 }}
            >
              <Icon size={28} weight="duotone" color={color} />
              <div className="stat-value">
                <AnimatedStat end={stat.end} suffix={stat.suffix} decimals={stat.decimals} />
              </div>
              <div className="stat-label">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="features-section" ref={featuresRef}>
        <motion.div className="section-header" {...reveal()}>
          <p className="section-tag">What We Offer</p>
          <h2>Everything You Need to<br /><span className="gradient-text">Land the Interview</span></h2>
        </motion.div>

        <div className="features-grid">
          {FEATURES.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={i}
              className="feature-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -10, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="feature-glow" />
              <div className="feature-icon">
                <Icon size={28} weight="duotone" color="#00c896" />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className="features-cta" {...reveal()}>
          <motion.button
            className="btn-primary"
            onClick={() => navigate("/your-resumes")}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 18 }}
          >
            <span>Optimise my Resume</span>
            <span className="btn-shine" />
          </motion.button>
          <p className="trust-line">No credit card · Secure processing · Instant results</p>
        </motion.div>
      </section>

      <section className="how-section" ref={howRef}>
        <motion.div className="section-header" {...reveal()}>
          <p className="section-tag">Simple Process</p>
          <h2>Three Steps to<br /><span className="gradient-text">Resume Success</span></h2>
        </motion.div>

        <div className="steps-row">
          {STEPS.map(({ Icon, title, desc }, i) => (
            <motion.div
              className="step-card"
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                className="step-bubble"
                whileHover={{ scale: 1.12 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <Icon size={26} weight="bold" />
              </motion.div>

              {i < 2 && (
                <motion.div
                  className="step-connector"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 + 0.5, ease: "easeOut" }}
                />
              )}

              <h3>{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="benefits-section">
        <motion.div className="benefits-text" {...reveal()}>
          <p className="section-tag">Why Choose Us</p>
          <h2>Built for<br /><span className="gradient-text">Real Results</span></h2>
          <p className="benefits-desc">
            Resume ATS Analyser helps jobseekers pass automated screening. Upload a resume, compare it with a job description, get a clear ATS score, and receive AI-powered edits to increase your chances of getting interviews.
          </p>
          <ul className="benefits-list">
            {BENEFITS.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.09, ease: "easeOut" }}
              >
                <span className="check-icon">
                  <Check size={12} weight="bold" color="#00c896" />
                </span>
                {b}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="benefits-visual" {...reveal(0.2)}>
          <motion.div
            className="visual-card"
            whileHover={{ y: -6, boxShadow: "0 40px 100px rgba(0,0,0,0.55)" }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div className="vc-header">
              <span className="vc-logo">✦ ResumeIQ</span>
              <span className="vc-score-badge">92/100</span>
            </div>
            <div className="vc-section-label">CONTENT ANALYSIS</div>
            {ANALYTICS.map((item, i) => (
              <div className="vc-row" key={i}>
                <span>{item.label}</span>
                <div className="vc-bar">
                  <motion.div
                    className="vc-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.val}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    style={{ background: item.color }}
                  />
                </div>
                <span className="vc-pct">{item.val}%</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="cta-section">
        <div className="cta-orb cta-orb-1" /><div className="cta-orb cta-orb-2" />
        <motion.div className="cta-content" {...reveal()}>
          <motion.div
            className="cta-badge"
            animate={{ boxShadow: ["0 0 0 0 rgba(0,200,150,0)", "0 0 0 8px rgba(0,200,150,0.08)", "0 0 0 0 rgba(0,200,150,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Rocket size={14} weight="fill" style={{ marginRight: 6 }} />
            Join 50,000+ job seekers
          </motion.div>
          <h2>Ready to Get More<br /><span className="gradient-text">Interview Callbacks?</span></h2>
          <p>Optimise your resume in under 2 minutes with AI-powered analysis.</p>
          <div className="hero-actions">
            <motion.button
              className="btn-primary"
              onClick={() => navigate("/your-resumes")}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 18 }}
            >
              <span>Start for Free</span>
              <span className="btn-shine" />
            </motion.button>
            <motion.button
              className="btn-secondary"
              onClick={() => featuresRef.current?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">✦ ResumeIQ</div>
            <p>AI-powered resume optimisation to help you land your dream job faster.</p>
            <div className="footer-socials">
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3, color: "#00c896", borderColor: "#00c896" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <Icon size={16} weight="bold" />
                </motion.a>
              ))}
            </div>
          </div>
          <div className="footer-links">
            {FOOTER_LINKS.map(({ heading, links }) => (
              <div className="footer-col" key={heading}>
                <h4>{heading}</h4>
                {links.map((l) => (
                  <motion.a
                    key={l}
                    href="#"
                    whileHover={{ x: 4, color: "#00c896" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {l}
                  </motion.a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 ResumeIQ. All rights reserved.</p>
          <p>Made with ❤️ for jobseekers worldwide</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
