import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";

import DeviceInfo from "../DeviceInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("Device Info", () => {
  describe("getConciseProperties()", () => {
    it("should return an array of strings", () => {
      const expected = ["name", "serialNumber", "status", "ip", "channels"];
      const actual = DeviceInfo.getConciseProperties();

      expect(actual).toHaveLength(expected.length);

      for (let i = 0; i < expected.length; i += 1) {
        expect(actual[i]).toEqual(expected[i]);
      }
    });
  });
});
