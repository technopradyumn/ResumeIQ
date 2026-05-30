import apiClient from "./client";

export const uploadResume = (file) => {
  const formData = new FormData();
  formData.append("resume", file);
  return apiClient
    .post("/resume/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((r) => r.data);
};

export const analyzeResume = ({ resumeText, jobDescription, fileName }) =>
  apiClient
    .post("/resume/analyze", { resumeText, jobDescription, fileName })
    .then((r) => r.data);

export const fetchResumeHistory = () =>
  apiClient
    .get("/resume/history")
    .then((r) => r.data);

export const fetchResumeEvaluation = (id) =>
  apiClient
    .get(`/resume/history/${id}`)
    .then((r) => r.data);
