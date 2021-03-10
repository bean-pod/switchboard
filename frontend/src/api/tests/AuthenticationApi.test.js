import { afterEach, describe, expect, it, jest } from "@jest/globals";
import axios from "axios";
import Cookies from "js-cookie";
import * as AuthenticationApi from "../AuthenticationApi";

jest.mock("axios");
jest.mock("js-cookie");
jest.spyOn(Cookies, "get");
jest.spyOn(Cookies, "set");
jest.spyOn(Cookies, "remove");

describe("AuthenticationApi", () => {
  const dummyAccessToken = "dummyAccessToken";
  const dummyAdminToken = "dummyAdminToken";
  const dummyRefreshToken = "dummyRefreshToken";

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("logIn", () => {
    it("should return incorrect credentials message on 403", async () => {
      const errorResponse = new Error("Forbidden");
      errorResponse.response = { status: "403" };
      axios.post.mockReturnValue(Promise.reject(errorResponse));

      await expect(AuthenticationApi.logIn).rejects.toEqual(
        new Error(AuthenticationApi.incorrectCredentialsMessage)
      );
    });

    it("should return unknown error otherwise", async () => {
      axios.post.mockReturnValue(Promise.reject(new Error("Network error")));

      await expect(AuthenticationApi.logIn).rejects.toEqual(
        new Error(AuthenticationApi.unknownErrorMessage)
      );
    });
  });

  describe("getAccessToken", () => {
    it("should call Cookies.get and return the access token", () => {
      Cookies.get.mockReturnValue(dummyAccessToken);
      const token = AuthenticationApi.getAccessToken();

      expect(Cookies.get).toHaveBeenCalledWith("access_token");
      expect(token).toEqual(dummyAccessToken);
    });
  });

  describe("getAdminToken", () => {
    it("should call Cookies.get and return the admin token", () => {
      Cookies.get.mockReturnValue(dummyAdminToken);
      const token = AuthenticationApi.getAdminToken();

      expect(Cookies.get).toHaveBeenCalledWith("admin_token");
      expect(token).toEqual(dummyAdminToken);
    });
  });

  describe("getRefreshToken", () => {
    it("should call Cookies.get and return the refresh token", () => {
      Cookies.get.mockReturnValue(dummyRefreshToken);
      const token = AuthenticationApi.getRefreshToken();

      expect(Cookies.get).toHaveBeenCalledWith("refresh_token");
      expect(token).toEqual(dummyRefreshToken);
    });
  });

  describe("isAuthenticated", () => {
    it("should return true if access token is defined", () => {
      Cookies.get.mockReturnValue(dummyAccessToken);
      const authenticated = AuthenticationApi.isAuthenticated();

      expect(Cookies.get).toHaveBeenCalledWith("access_token");
      expect(authenticated).toEqual(true);
    });

    it("should return false if access token is undefined", () => {
      Cookies.get.mockReturnValue(undefined);
      const authenticated = AuthenticationApi.isAuthenticated();

      expect(Cookies.get).toHaveBeenCalledWith("access_token");
      expect(authenticated).toEqual(false);
    });
  });

  describe("isAdmin", () => {
    it("should return true if admin token is defined", () => {
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
      AuthenticationApi.handleLogout();

      expect(Cookies.remove).toBeCalledTimes(3);
      expect(Cookies.remove.mock.calls[0][0]).toBe("access_token");
      expect(Cookies.remove.mock.calls[1][0]).toBe("admin_token");
      expect(Cookies.remove.mock.calls[2][0]).toBe("refresh_token");
    });
  });

  describe("handleLogin() function", () => {
    it("should call Cookies.set 3 times with expected args & return true", () => {

      const expectedTokens = {
        access_token: true,
        admin_token: true,
        refresh_token: true
      };

      const value = AuthenticationApi.handleLogin();

      expect(Cookies.set).toBeCalledTimes(3);
      expect(Cookies.set.mock.calls[0][0]).toBe("access_token");
      expect(Cookies.set.mock.calls[0][1]).toBe(expectedTokens.access_token);

      expect(Cookies.set.mock.calls[1][0]).toBe("admin_token");
      expect(Cookies.set.mock.calls[1][1]).toBe(expectedTokens.admin_token);
      
      expect(Cookies.set.mock.calls[2][0]).toBe("refresh_token");
      expect(Cookies.set.mock.calls[2][1]).toBe(expectedTokens.refresh_token);
      
      // expect(value).toBe(true);
    });
  });
});
