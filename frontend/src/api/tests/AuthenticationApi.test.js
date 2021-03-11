import { afterEach, describe, expect, it, jest } from "@jest/globals";
import axios from "axios";
import Cookies from "js-cookie";
import * as AuthenticationUtil from "../AuthenticationUtil";
import * as AuthenticationApi from "../AuthenticationApi";

jest.mock("axios");
jest.mock("../AuthenticationUtil");
jest.spyOn(AuthenticationUtil, "saveToken");
jest.mock("js-cookie");
jest.spyOn(Cookies, "remove");

describe("AuthenticationApi", () => {
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

  describe("logOut() function", () => {
    it("should call Cookies.remove() once", () => {
      AuthenticationApi.logOut();

      expect(Cookies.remove).toHaveBeenCalledWith("authToken");
    });
  });

});
