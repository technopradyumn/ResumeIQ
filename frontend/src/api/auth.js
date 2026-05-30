import apiClient from "./client";

export const loginUser = ({ email, password }) =>
  apiClient.post("/auth/login", { email, password }).then((r) => r.data);

export const registerUser = ({ name, email, password }) =>
  apiClient.post("/auth/register", { name, email, password }).then((r) => r.data);
