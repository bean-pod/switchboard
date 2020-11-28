import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, jest, it } from "@jest/globals";

import DeviceInfo from "../DeviceInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("Device Info", () => {
  describe("getProperties()", () => {
    it("should return an array of strings", () => {
      const expected = ["name", "serialNumber", "status", "ip", "channels"];
      const actual = DeviceInfo.getProperties();

      expect(actual).toHaveLength(expected.length);

      for (let i = 0; i < expected.length; i++) {
        expect(actual[i]).toEqual(expected[i]);
      }
    });
  });
});
