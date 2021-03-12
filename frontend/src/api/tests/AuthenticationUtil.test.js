import { afterEach, describe, expect, jest } from "@jest/globals";
import Cookies from "js-cookie";
import * as AuthenticationUtil from "../AuthenticationUtil";

const dummyToken =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYxNTU2ODI1M30.FwKJDZnHUaO3Z7m37xe7eahvP-Q5MqxpCDXMdEyTZ7reOtoHQBvIi7LoE4OeXds5qUb1vUfEMS1jzUbAvwmQ3A";
const dummyTokenExpiry = new Date(1615568253000);
const dummyTokenNotAdmin =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjE1NTY4MjUzfQ.FwKJDZnHUaO3Z7m37xe7eahvP-Q5MqxpCDXMdEyTZ7reOtoHQBvIi7LoE4OeXds5qUb1vUfEMS1jzUbAvwmQ3A";

jest.mock("js-cookie");
jest.spyOn(Cookies, "get");
jest.spyOn(Cookies, "set");
jest.spyOn(Cookies, "remove");

describe("AuthenticationUtil", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("saveToken", () => {
    it("should save the token to local storage", () => {
      AuthenticationUtil.saveToken(dummyToken);
      expect(Cookies.set).toHaveBeenCalledWith("authToken", dummyToken, {
        expires: dummyTokenExpiry,
        SameSite: "Strict"
      });
    });
  });

  describe("getAuthorizationHeader", () => {
    it("should get the correct authorization header", () => {
      const expectedHeader = {
        headers: { Authorization: `${dummyToken}` }
      };
      Cookies.get.mockReturnValue(dummyToken);

      const result = AuthenticationUtil.getAuthorizationHeader();

      expect(result).toEqual(expectedHeader);
      expect(Cookies.get).toHaveBeenCalledWith("authToken");
    });
  });

  describe("isAuthenticated", () => {
    it("should return true if auth token is defined", () => {
      Cookies.get.mockReturnValue(dummyToken);
      const authenticated = AuthenticationUtil.isAuthenticated();

      expect(Cookies.get).toHaveBeenCalledWith("authToken");
      expect(authenticated).toEqual(true);
    });

    it("should return false if auth token is undefined", () => {
      Cookies.get.mockReturnValue(undefined);
      const authenticated = AuthenticationUtil.isAuthenticated();

      expect(Cookies.get).toHaveBeenCalledWith("authToken");
      expect(authenticated).toEqual(false);
    });
  });

  describe("isAdmin", () => {
    it("should return true if jwt token has role admin", () => {
      Cookies.get.mockReturnValue(dummyToken);
      const admin = AuthenticationUtil.isAdmin();

      expect(Cookies.get).toHaveBeenCalledWith("authToken");
      expect(admin).toEqual(true);
    });

    it("should return false if jwt token does not have role admin", () => {
      Cookies.get.mockReturnValue(dummyTokenNotAdmin);
      const admin = AuthenticationUtil.isAdmin();

      expect(Cookies.get).toHaveBeenCalledWith("authToken");
      expect(admin).toEqual(false);
    });
  });
});
