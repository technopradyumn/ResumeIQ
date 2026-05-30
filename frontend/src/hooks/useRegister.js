import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/auth";

export const useRegister = () =>
  useMutation({
    mutationFn: registerUser,
  });
