import { afterEach, describe, expect, jest } from "@jest/globals";
import axios from "axios";
import { saveToken } from "../AuthenticationUtil";
import * as AuthenticationApi from "../AuthenticationApi";

jest.mock("axios");
jest.mock("../AuthenticationUtil");

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

    it("should save token in localstorage", async () => {
      const expectedToken = "Bearer the_token";
      axios.get.mockResolvedValue({
        headers: {
          authorization: expectedToken
        }
      });
      await AuthenticationApi.logIn({ username: "user", password: "pass" });

      expect(saveToken).toHaveBeenCalledWith(expectedToken);
    });
  });
});
