import { afterEach, describe } from "@jest/globals";
import { getAuthorizationHeader, saveToken } from "../AuthenticationUtil";

describe("AuthenticationUtil", () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe("saveToken", () => {
    it("should save the token to local storage", () => {
      const expectedToken = "token";
      saveToken(expectedToken);
      expect(localStorage.getItem("authToken")).toEqual(expectedToken);
    });
  });

  describe("getAuthorizationHeader", () => {
    it("should get the correct authorization header", () => {
      const token = "token";
      const expectedHeader = {
        headers: { Authorization: `${token}` }
      };
      localStorage.setItem("authToken", token);

      const result = getAuthorizationHeader();

      expect(result).toEqual(expectedHeader);
    });
  });
});
