import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadSimpleIcon as UploadSimple, FilePdfIcon as FilePdf,
  XIcon as X, WarningIcon as Warning,
} from "@phosphor-icons/react";
import { useResumeAnalysis } from "../../hooks/useResumeAnalysis";
import ReportModal from "../ReportModal";
import "./index.css";


const YourResumes = () => {
  const [selectedFile, setSelectedFile]     = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [showModal, setShowModal]           = useState(false);
  const [dragOver, setDragOver]             = useState(false);
  const fileRef = useRef(null);

  const { mutate: analyze, isPending, error, data: analysisResult } = useResumeAnalysis();

  const handleFile = (file) => {
    if (file && file.type === "application/pdf") setSelectedFile(file);
  };
  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]);
  };
  const handleSubmit = () => {
    if (!selectedFile) return;
    analyze(
      { file: selectedFile, jobDescription: jobDescription.trim() || "General software engineering role" },
      { onSuccess: () => setShowModal(true) }
    );
  };

  const report = analysisResult?.suggestions?.analysis;
  const score  = report?.compatibility_score ?? 0;

  return (
    <div className="resume-page">
      <div className="rp-orb rp-orb-1" />
      <div className="rp-orb rp-orb-2" />

      <motion.div
        className="resume-wrapper"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="rp-header">
          <span className="rp-tag">ATS Analyser</span>
          <h1 className="rp-title">Analyse Your <span className="grad-text">Resume</span></h1>
          <p className="rp-sub">Upload your PDF and paste a job description to get an AI-powered ATS compatibility report.</p>
        </div>

        <div className="upload-card">
          {/* Drop zone */}
          <motion.div
            className={`drop-zone ${dragOver ? "drag-over" : ""} ${selectedFile ? "has-file" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            whileHover={{ borderColor: "rgba(0,200,150,0.5)" }}
            animate={dragOver ? { scale: 1.01, borderColor: "rgba(0,200,150,0.7)" } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".pdf"
              className="file-hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
            <AnimatePresence mode="wait">
              {selectedFile ? (
                <motion.div
                  key="file"
                  className="file-selected"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="file-icon-box">
                    <FilePdf size={28} weight="duotone" color="#00c896" />
                  </div>
                  <div className="file-info">
                    <p className="file-name">{selectedFile.name}</p>
                    <p className="file-size">{(selectedFile.size / 1024).toFixed(1)} KB · PDF</p>
                  </div>
                  <motion.button
                    className="file-clear"
                    onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                    whileHover={{ scale: 1.15, background: "rgba(248,113,113,0.15)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={14} weight="bold" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="prompt"
                  className="drop-prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="drop-icon"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <UploadSimple size={36} weight="bold" color="#00c896" />
                  </motion.div>
                  <p className="drop-main">
                    Drop your resume here or <span className="drop-link">browse files</span>
                  </p>
                  <p className="drop-hint">PDF only · Max 10 MB</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Job description */}
          <div className="jd-section">
            <label className="jd-label">
              Job Description
              <span className="jd-optional"> — optional, improves accuracy</span>
            </label>
            <textarea
              className="jd-textarea"
              placeholder="Paste the job description here for a precise keyword match..."
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <div className="upload-actions">
            <motion.button
              className="btn-analyze"
              onClick={handleSubmit}
              disabled={isPending || !selectedFile}
              whileHover={!isPending && selectedFile ? { scale: 1.03, y: -2 } : {}}
              whileTap={!isPending && selectedFile ? { scale: 0.97 } : {}}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
            >
              {isPending ? <><span className="spinner" />Analysing...</> : "Upload & Analyse"}
            </motion.button>
            {analysisResult && (
              <motion.button
                className="btn-report"
                onClick={() => setShowModal(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Last Report
              </motion.button>
            )}
          </div>

          {error && (
            <motion.p
              className="upload-error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Warning size={16} weight="fill" style={{ marginRight: 6 }} />
              {error.message}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* ═══ MODAL ═══ */}
      <ReportModal showModal={showModal} setShowModal={setShowModal} report={report} />
    </div>
  );
};

export default YourResumes;
