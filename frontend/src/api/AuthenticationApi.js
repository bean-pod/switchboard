import axios from "axios";

export const unknownErrorMessage =
  "An unknown error occurred. Please try again later";
export const incorrectCredentialsMessage =
  "Incorrect username and/or password. Please enter the correct credentials and try again.";

export async function logIn() {
  // TODO: Correct backend URL from environment variables
  return axios
    .post("backendUrl/login")
    .then(() => {
      // TODO: Happy path login
    })
    .catch((error) => {
      let message = unknownErrorMessage;
      if (error.response && error.response.status === "403") {
        message = incorrectCredentialsMessage;
      }
      return Promise.reject(new Error(message));
    });
}
