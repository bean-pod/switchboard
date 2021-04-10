import axios from "axios";
import Cookies from "js-cookie";
import * as AuthenticationUtil from "./AuthenticationUtil";

export const unknownErrorMessage =
  "An unknown error occurred. Please try again later.";
export const incorrectCredentialsMessage =
  "Incorrect username and/or password. Please enter the correct credentials and try again.";

export async function logIn(credentials) {
  const authorizationHeader = {
    auth: {
      username: credentials.username,
      password: credentials.password
    }
  };

  return axios
    .get(process.env.REACT_APP_TOKEN, authorizationHeader)
    .then((response) => {
      AuthenticationUtil.saveToken(response.headers.authorization);
    })
    .catch((error) => {
      let message = unknownErrorMessage;
      if (error.response && error.response.status === "403") {
        message = incorrectCredentialsMessage;
      }
      return Promise.reject(new Error(message));
    });
}

export function logOut() {
  Cookies.remove("authToken");
}
