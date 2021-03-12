import Cookies from "js-cookie";

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function saveToken(token) {
  const tokenPayload = parseJwt(token.split(" ")[1]);
  const expiryDate = new Date(tokenPayload.exp * 1000);
  Cookies.set("authToken", token, { expires: expiryDate, SameSite: "Strict" });
}

export function getAuthorizationHeader() {
  const token = Cookies.get("authToken");
  return {
    headers: { Authorization: `${token}` }
  };
}

export function isAuthenticated() {
  return !!Cookies.get("authToken");
}

export function isAdmin() {
  const token = Cookies.get("authToken");
  const tokenPayload = parseJwt(token.split(" ")[1]);
  return tokenPayload.sub === "admin";
}

export default {
  saveToken,
  getAuthorizationHeader
};
