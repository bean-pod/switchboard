import axios from "axios";

export const unknownErrorMessage =
  "An unknown error occurred. Please try again later.";
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

export function getAccessToken() {
  return Cookies.get("access_token");
}

export function getAdminToken() {
  return Cookies.get("admin_token");
}

export function getRefreshToken() {
  return Cookies.get("refresh_token");
}

export function isAuthenticated() {
  return !!getAccessToken();
}

export function isAdmin() {
  return !!getAdminToken();
}

export function handleLogout() {
  // API call.then(response =>
  Cookies.remove("access_token");
  Cookies.remove("admin_token");
  Cookies.remove("refresh_token");
}

export function handleLogin() {
  authenticate();
}

export async function authenticate() {
  //   if (getRefreshToken()) {
  try {
    // const tokens = await refreshTokens() // call an API, returns tokens

    const tokens = {
      access_token: true,
      admin_token: true,
      refresh_token: true
    };
    const expires = (tokens.expires_in || 60 * 60) * 1000;
    const inOneHour = new Date(new Date().getTime() + expires);

    // you will have the exact same setters in your Login page/app too
    Cookies.set("access_token", tokens.access_token);
    Cookies.set("admin_token", tokens.admin_token, { expires: inOneHour });
    Cookies.set("refresh_token", tokens.refresh_token);

    return true;
  } catch (error) {
    // redirectToLogin()
    return false;
  }
  // }
  // // redirectToLogin()
  // return false;
}
