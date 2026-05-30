import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useResumeHistory } from "../../hooks/useResumeHistory";
import { format } from "date-fns";
import { 
  FilePdfIcon as FilePdf, 
  ClockIcon as Clock,
  CheckCircleIcon as CheckCircle,
  WarningIcon as Warning
} from "@phosphor-icons/react";
import ReportModal from "../ReportModal";
import "./index.css";

const History = () => {
  const { data: history, isLoading, error } = useResumeHistory();
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  return (
    <div className="history-page">
      <div className="hp-orb hp-orb-1" />
      <div className="hp-orb hp-orb-2" />

      <motion.div
        className="history-wrapper"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="hp-header">
          <span className="hp-tag">Dashboard</span>
          <h1 className="hp-title">Your <span className="grad-text">History</span></h1>
          <p className="hp-sub">View all your previous resume analyses and their compatibility scores.</p>
        </div>

        {isLoading ? (
          <div className="history-loading">
            <span className="spinner" />
            <p>Loading your history...</p>
          </div>
        ) : error ? (
          <div className="history-error">
            <Warning size={24} color="#f87171" />
            <p>{error.message || "Failed to load history."}</p>
          </div>
        ) : history?.length === 0 ? (
          <div className="history-empty">
            <FilePdf size={48} color="#8896b3" weight="duotone" />
            <h3>No Resumes Analyzed Yet</h3>
            <p>Go to the ResumeIQ to upload your first resume!</p>
          </div>
        ) : (
          <div className="history-grid">
            <AnimatePresence>
              {history?.map((item, index) => (
                <motion.div
                  key={item._id}
                  className="history-card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <div className="hc-top">
                    <FilePdf size={28} color="#00c896" weight="duotone" />
                    <div className="hc-score-badge" style={{
                      color: item.analysis.compatibility_score >= 70 ? "#00c896" : item.analysis.compatibility_score >= 45 ? "#f59e0b" : "#f87171",
                      background: item.analysis.compatibility_score >= 70 ? "rgba(0,200,150,0.15)" : item.analysis.compatibility_score >= 45 ? "rgba(245,158,11,0.15)" : "rgba(248,113,113,0.15)"
                    }}>
                      {item.analysis.compatibility_score}/100
                    </div>
                  </div>
                  
                  <div className="hc-info">
                    <h3 className="hc-filename" title={item.fileName}>{item.fileName || "Untitled Resume"}</h3>
                    <div className="hc-date">
                      <Clock size={14} />
                      {format(new Date(item.createdAt), "MMM d, yyyy 'at' h:mm a")}
                    </div>
                  </div>
                  
                  <button 
                    className="hc-btn-view"
                    onClick={() => handleViewReport(item.analysis)}
                  >
                    View Details
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Report Modal */}
      <ReportModal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        report={selectedReport} 
      />
    </div>
  );
};

export default History;
