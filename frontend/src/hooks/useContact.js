import { useMutation } from "@tanstack/react-query";
import { submitContact } from "../api/contact";

export const useContact = () =>
  useMutation({
    mutationFn: submitContact,
  });
