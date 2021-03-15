import axios from "axios";
import { getAuthorizationHeader } from "./AuthenticationUtil";

export default async function createUser(credentials) {
  return axios.post(
    process.env.REACT_APP_SIGNUP,
    {
      username: credentials.username,
      password: credentials.password,
      userRole: "USER"
    },
    getAuthorizationHeader()
  );
}
