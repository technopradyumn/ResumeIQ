import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadResume, analyzeResume } from "../api/resume";

export const useResumeAnalysis = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ file, jobDescription }) => {
      const { text } = await uploadResume(file);
      const result = await analyzeResume({ resumeText: text, jobDescription, fileName: file.name });
      return result;
    },
    onSuccess: () => {
      // Invalidate history query so dashboard updates
      queryClient.invalidateQueries({ queryKey: ["resumeHistory"] });
    }
  });
};
