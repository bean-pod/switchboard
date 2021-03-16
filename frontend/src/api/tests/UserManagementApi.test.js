import axios from "axios";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, jest, it } from "@jest/globals";
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

describe("User Management Api", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should call axios.post and return a 200", () => {
      const expectedCredentials = {
        username: "test user",
        password: "test password",
        userRole: "USER"
      };

      axios.post.mockResolvedValue();
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
