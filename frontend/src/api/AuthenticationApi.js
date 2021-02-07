import axios from "axios";

export async function logIn(credentials) {
  // TODO: Correct backend URL from environment variables
  return axios.post("backendUrl/login").then(() => {
    // TODO: Happy path login
  });
}
