import { afterEach, describe, expect, jest } from "@jest/globals";
import axios from "axios";
import * as AuthenticationApi from "../AuthenticationApi";

jest.mock("axios");

describe("AuthenticationApi", () => {
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
});
