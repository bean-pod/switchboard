import axios from "axios";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, jest, it } from "@jest/globals";
import * as authenticationUtil from "../AuthenticationUtil";
import * as UserManagementApi from "../UserManagementApi";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("axios");
jest.mock("../AuthenticationUtil");

const authorizationHeader = {
  headers: {
    Authorization: "Bearer the_token"
  }
};

describe("UserManagementApi", () => {
  describe("createUser()", () => {
    it("should call axios.post with the user credentials and authorization header", () => {
      const expectedCredentials = {
        username: "user",
        password: "password",
        userRole: "USER"
      };

      authenticationUtil.getAuthorizationHeader = jest
        .fn()
        .mockReturnValue(authorizationHeader);

      UserManagementApi.createUser(expectedCredentials);

      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8080/user/sign-up",
        expectedCredentials,
        authorizationHeader
      );
    });
  });
});
