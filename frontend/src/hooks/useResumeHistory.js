import { useQuery } from "@tanstack/react-query";
import { fetchResumeHistory, fetchResumeEvaluation } from "../api/resume";

export const useResumeHistory = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["resumeHistory"],
    queryFn: fetchResumeHistory,
    enabled: !!token,
  });
};

export const useResumeEvaluation = (id) => {
  return useQuery({
    queryKey: ["resumeEvaluation", id],
    queryFn: () => fetchResumeEvaluation(id),
    enabled: !!id,
  });
};
