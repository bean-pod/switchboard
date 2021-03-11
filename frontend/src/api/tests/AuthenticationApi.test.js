import { afterEach, describe, expect, it, jest } from "@jest/globals";
import axios from "axios";
import Cookies from "js-cookie";
import * as AuthenticationUtil from "../AuthenticationUtil";
import * as AuthenticationApi from "../AuthenticationApi";

jest.mock("axios");
jest.mock("js-cookie");
jest.spyOn(Cookies, "get");
jest.spyOn(Cookies, "set");
jest.spyOn(Cookies, "remove");
jest.mock("../AuthenticationUtil");
jest.spyOn(AuthenticationUtil, "saveToken");

describe("AuthenticationApi", () => {
  const dummyAuthToken = "authToken";

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("logIn", () => {
    it("should return incorrect credentials message on 403", async () => {
      const errorResponse = new Error("Forbidden");
      errorResponse.response = { status: "403" };
      axios.get.mockReturnValue(Promise.reject(errorResponse));

      await expect(
        AuthenticationApi.logIn({ username: "user", password: "pass" })
      ).rejects.toEqual(
        new Error(AuthenticationApi.incorrectCredentialsMessage)
      );
    });

    it("should return unknown error otherwise", async () => {
      axios.get.mockReturnValue(Promise.reject(new Error("Network error")));

      await expect(
        AuthenticationApi.logIn({ username: "user", password: "pass" })
      ).rejects.toEqual(new Error(AuthenticationApi.unknownErrorMessage));
    });

    it("should save token using AuthenticationUtil", async () => {
      const dummyAuthorizationHeader = "Bearer the_token";
      axios.get.mockResolvedValue({
        headers: {
          authorization: dummyAuthorizationHeader
        }
      });
      await AuthenticationApi.logIn({ username: "user", password: "pass" });

      expect(AuthenticationUtil.saveToken).toHaveBeenCalledWith(dummyAuthorizationHeader);
    });
  });

  describe("isAuthenticated", () => {
    it("should return true if auth token is defined", () => {
      Cookies.get.mockReturnValue(dummyAuthToken);
      const authenticated = AuthenticationApi.isAuthenticated();

      expect(Cookies.get).toHaveBeenCalledWith("authToken");
      expect(authenticated).toEqual(true);
    });

    it("should return false if auth token is undefined", () => {
      Cookies.get.mockReturnValue(undefined);
      const authenticated = AuthenticationApi.isAuthenticated();

      expect(Cookies.get).toHaveBeenCalledWith("authToken");
      expect(authenticated).toEqual(false);
    });
  });

  describe("isAdmin", () => {
    it("should ", () => {
      Cookies.get.mockReturnValue(dummyAdminToken);
      const admin = AuthenticationApi.isAdmin();

      expect(Cookies.get).toHaveBeenCalledWith("admin_token");
      expect(admin).toEqual(true);
    });

    it("should return false if access token is undefined", () => {
      Cookies.get.mockReturnValue(undefined);
      const admin = AuthenticationApi.isAdmin();

      expect(Cookies.get).toHaveBeenCalledWith("admin_token");
      expect(admin).toEqual(false);
    });
  });

  describe("handleLogout() function", () => {
    it("should call Cookies.remove() 3 times", () => {
      AuthenticationApi.logOut();

      expect(Cookies.remove).toBeCalledTimes(3);
      expect(Cookies.remove.mock.calls[0][0]).toBe("access_token");
      expect(Cookies.remove.mock.calls[1][0]).toBe("admin_token");
      expect(Cookies.remove.mock.calls[2][0]).toBe("refresh_token");
    });
  });

  describe("handleLogin() function", () => {
    it("should call Cookies.set 3 times with expected args & return true", async () => {
      const expectedTokens = {
        access_token: true,
        admin_token: true,
        refresh_token: true
      };

      const value = await AuthenticationApi.handleLogin();

      expect(Cookies.set).toBeCalledTimes(3);
      expect(Cookies.set.mock.calls[0][0]).toBe("access_token");
      expect(Cookies.set.mock.calls[0][1]).toBe(expectedTokens.access_token);

      expect(Cookies.set.mock.calls[1][0]).toBe("admin_token");
      expect(Cookies.set.mock.calls[1][1]).toBe(expectedTokens.admin_token);

      expect(Cookies.set.mock.calls[2][0]).toBe("refresh_token");
      expect(Cookies.set.mock.calls[2][1]).toBe(expectedTokens.refresh_token);

      expect(value).toBe(true);
    });
  });
});
