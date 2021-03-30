import { describe, expect, it } from "@jest/globals";

import { zipProperties } from "../SimpleTableUtil";

describe("zipProperties() method", () => {
  describe("when given two arrays", () => {
    it("should return a single array of pairs", () => {
      const arr1 = ["one", "two", "three"];
      const arr2 = [1, 2, 3];
      const expectedResults = [
        ["one", 1],
        ["two", 2],
        ["three", 3]
      ];

      const actualResults = zipProperties(arr1, arr2);

      expect(actualResults).toStrictEqual(expectedResults);
    });
  });
});
