import { motion, AnimatePresence } from "framer-motion";
import {
  XIcon as X,
  CheckCircleIcon as CheckCircle,
  XCircleIcon as XCircle,
  SparkleIcon as Sparkle,
} from "@phosphor-icons/react";
import "./index.css";

const ScoreRing = ({ score }) => {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 70 ? "#00c896" : score >= 45 ? "#f59e0b" : "#f87171";
  return (
    <div className="score-ring-wrap">
      <svg viewBox="0 0 120 120" className="score-svg">
        <circle cx="60" cy="60" r={r} className="ring-track" />
        <motion.circle
          cx="60" cy="60" r={r}
          className="ring-progress"
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ strokeDasharray: circ, stroke: color }}
        />
      </svg>
      <div className="score-center">
        <span className="score-val" style={{ color }}>{score}</span>
        <span className="score-pct">/ 100</span>
      </div>
    </div>
  );
};

const ReportModal = ({ showModal, setShowModal, report }) => {
  const score = report?.compatibility_score ?? 0;

  return (
    <AnimatePresence>
      {showModal && report && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <motion.div
            className="modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{    opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="modal-header">
              <h2>ATS Analysis Report</h2>
              <motion.button
                className="modal-close"
                onClick={() => setShowModal(false)}
                whileHover={{ scale: 1.1, background: "rgba(248,113,113,0.12)" }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} weight="bold" />
              </motion.button>
            </div>

            {/* Score hero */}
            <div className="modal-score-hero">
              <ScoreRing score={score} />
              <div className="score-meta">
                <p className="score-label-main">Compatibility Score</p>
                <p className="score-desc">
                  {score >= 70
                    ? "Strong match — great chance of passing ATS filters."
                    : score >= 45
                    ? "Moderate match — add missing skills to improve."
                    : "Low match — significant optimisations recommended."}
                </p>
              </div>
            </div>

            {/* Overall assessment */}
            <div className="modal-section">
              <h3>Overall Assessment</h3>
              <p className="modal-assessment">{report.overall_assessment}</p>
            </div>

            {/* Skills grid */}
            <div className="skills-grid">
              <div className="skill-col">
                <h3>
                  <CheckCircle size={16} weight="fill" color="#00c896" style={{ marginRight: 6, verticalAlign: "middle" }} />
                  Your Skills
                </h3>
                <div className="tag-list">
                  {report.resume_skills?.map((s, i) => <span key={i} className="tag tag-green">{s}</span>)}
                </div>
              </div>
              <div className="skill-col">
                <h3>
                  <Sparkle size={16} weight="fill" color="#00A3FF" style={{ marginRight: 6, verticalAlign: "middle" }} />
                  Required Skills
                </h3>
                <div className="tag-list">
                  {report.job_description_skills?.map((s, i) => <span key={i} className="tag tag-blue">{s}</span>)}
                </div>
              </div>
            </div>

            <div className="skills-grid">
              <div className="skill-col">
                <h3>
                  <XCircle size={16} weight="fill" color="#f87171" style={{ marginRight: 6, verticalAlign: "middle" }} />
                  Missing Skills
                </h3>
                <div className="tag-list">
                  {report.missing_skills?.from_resume_for_job_description?.map((s, i) => <span key={i} className="tag tag-red">{s}</span>)}
                </div>
              </div>
              <div className="skill-col">
                <h3>
                  <CheckCircle size={16} weight="fill" color="#a78bfa" style={{ marginRight: 6, verticalAlign: "middle" }} />
                  Extra Skills
                </h3>
                <div className="tag-list">
                  {report.missing_skills?.from_job_description_for_resume?.map((s, i) => <span key={i} className="tag tag-purple">{s}</span>)}
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="modal-section">
              <h3>ATS Optimisation Tips</h3>
              <ol className="tips-list">
                {report.ats_optimization_tips?.map((tip, i) => (
                  <li key={i}>{tip.replace(/\*\*/g, "")}</li>
                ))}
              </ol>
            </div>

            {/* Bullet improvements */}
            <div className="modal-section">
              <h3>Bullet Point Improvements</h3>
              {report.ats_optimized_bullet_point_improvements?.map((item, i) => (
                <div key={i} className="bullet-card">
                  <p className="bullet-original"><strong>Original:</strong> {item.original_summary}</p>
                  <p className="bullet-reasoning"><strong>Why:</strong> {item.reasoning}</p>
                  <div className="bullet-suggestions">
                    {item.suggested_bullets?.map((b, j) => (
                      <div key={j} className="bullet-item">→ {b}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReportModal;
