import { afterEach, describe, expect, jest } from "@jest/globals";
import Cookies from "js-cookie";
import * as AuthenticationUtil from "../AuthenticationUtil";

const dummySuperuserToken =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJTVVBFUlVTRVIiLCJleHAiOjE2MTU2Njc4MDZ9.qYoS92pZ9qRqbLQ3LfUbWUgNCQ30KvEV3TP65RSA5piDevGgyEDAjPYVm8KS0w3KAKGpkIPJfPuQWmpRxgI_QQ";
const dummyTokenExpiry = new Date(1615667806000);
const dummyUserToken =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0YWtvbyIsInJvbGUiOiJVU0VSIiwiZXhwIjoxNjE1NjY3ODQzfQ.ZREE9nlhA0706bxdWvSjne2K4pivSJDUN_1SY5YNhh4SR-6RPXXLEpqVMHnfT9tZxLiJZ8YCdRvgA6wxhX-dSw";
const dummyAdminToken = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJub2dnIiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNjE1NjY3ODY2fQ.rxXWY5gwPtt0wu_1Qcaedp-rNZnCWP95aLq9LHGF7I8InO3N_2CV25Jhf1o84wc7slgqyMV9lFROEiVFUvDMAg";

jest.mock("js-cookie");
jest.spyOn(Cookies, "get");
jest.spyOn(Cookies, "set");
jest.spyOn(Cookies, "remove");

describe("AuthenticationUtil", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("saveToken", () => {
    it("should save the token in a cookie", () => {
      AuthenticationUtil.saveToken(dummySuperuserToken);
      expect(Cookies.set).toHaveBeenCalledWith("authToken", dummySuperuserToken, {
        expires: dummyTokenExpiry,
        SameSite: "Strict"
      });
    });
  });

  describe("getAuthorizationHeader", () => {
    it("should get the correct authorization header", () => {
      const expectedHeader = {
        headers: { Authorization: `${dummySuperuserToken}` }
      };
      Cookies.get.mockReturnValue(dummySuperuserToken);

      const result = AuthenticationUtil.getAuthorizationHeader();

      expect(result).toEqual(expectedHeader);
      expect(Cookies.get).toHaveBeenCalledWith("authToken");
    });
  });

  describe("isAuthenticated", () => {
    it("should return true if auth token is defined", () => {
      Cookies.get.mockReturnValue(dummySuperuserToken);
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
    it("should return true if jwt token has role SUPERUSER", () => {
      Cookies.get.mockReturnValue(dummySuperuserToken);
      const admin = AuthenticationUtil.isAdmin();

      expect(Cookies.get).toHaveBeenCalledWith("authToken");
      expect(admin).toEqual(true);
    });

    it("should return true if jwt token has role ADMIN", () => {
        Cookies.get.mockReturnValue(dummyAdminToken);
        const admin = AuthenticationUtil.isAdmin();
  
        expect(Cookies.get).toHaveBeenCalledWith("authToken");
        expect(admin).toEqual(true);
      });

    it("should return false if jwt token has role USER", () => {
      Cookies.get.mockReturnValue(dummyUserToken);
      const admin = AuthenticationUtil.isAdmin();

      expect(Cookies.get).toHaveBeenCalledWith("authToken");
      expect(admin).toEqual(false);
    });
  });
});
