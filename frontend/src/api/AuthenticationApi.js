import axios from "axios";
import {saveToken} from "./AuthenticationUtil";

export const unknownErrorMessage =
  "An unknown error occurred. Please try again later.";
export const incorrectCredentialsMessage =
  "Incorrect username and/or password. Please enter the correct credentials and try again.";

export async function logIn(credentials) {
  const authorizationHeader = {
    auth: {
      username: credentials.username,
      password: credentials.password
    },
  };
  console.log(authorizationHeader);
  return axios
    .get(process.env.REACT_APP_TOKEN, authorizationHeader)
    .then((response) => {
      saveToken(response.headers.authorization);
    })
    .catch((error) => {
      let message = unknownErrorMessage;
      if (error.response && error.response.status === "403") {
        message = incorrectCredentialsMessage;
      }
      return Promise.reject(new Error(message));
    });
}
