import apiClient from "./client";

export const submitContact = ({ name, email, message }) =>
  apiClient.post("/contact", { name, email, message }).then((r) => r.data);
