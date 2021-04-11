import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest
} from "@jest/globals";
import StreamTableWrapper from "../StreamTableWrapper";
import StreamTable from "../StreamTable";
import StreamInfo from "../../model/StreamInfo";
import * as SnackbarMessage from "../../general/SnackbarMessage";

Enzyme.configure({ adapter: new Adapter() });

const snackbarSpy = jest.spyOn(SnackbarMessage, "snackbar");

describe("<StreamTableWrapper/> component", () => {
  let wrapper;
  const dummyStream = [new StreamInfo(1, null, null, null, null)];
  const dummySource = {
    getAllStreams: jest.fn()
  };
  const dummyColumns = [
    {
      title: "ID",
      field: "id"
    },
    {
      title: "Date",
      field: "date"
    }
  ];

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  describe("componentDidMount() function", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <StreamTableWrapper dataSource={dummySource} columns={dummyColumns} />,
        {
          disableLifecycleMethods: true
        }
      );
    });

    it("calls the passed dataSource's getAllStreams()", () => {
      dummySource.getAllStreams.mockResolvedValue(dummyStream);

      wrapper.instance().componentDidMount();

      expect(dummySource.getAllStreams).toHaveBeenCalledTimes(1);
    });
    it("passes the resolved streams to handleStreamsChange()", async () => {
      dummySource.getAllStreams.mockResolvedValue(dummyStream);

      const handleStreamsSpy = jest.spyOn(
        wrapper.instance(),
        "handleStreamsChange"
      );

      wrapper.instance().componentDidMount();

      await new Promise(setImmediate);

      expect(handleStreamsSpy).toHaveBeenCalledWith(dummyStream);
    });
    it("if it rejects, an error snackbar with the caught error message is displayed", async () => {
      const returnedError = {
        message: "test"
      };
      dummySource.getAllStreams.mockRejectedValue(returnedError);

      wrapper.instance().componentDidMount();

      await new Promise(setImmediate);

      expect(snackbarSpy).toHaveBeenCalledWith(
        "error",
        `Failed to fetch streams: ${returnedError.message}`
      );
    });
  });

  describe("<StreamTableWrapper class functions", () => {
    beforeEach(() => {
      dummySource.getAllStreams.mockResolvedValue(dummyStream);
      wrapper = Enzyme.shallow(
        <StreamTableWrapper dataSource={dummySource} columns={dummyColumns} />
      );
    });
    describe("handleStreamsChange()", () => {
      it("should set the state streams", () => {
        const testValue = [new StreamInfo()];

        const defaultState = {
          streams: dummyStream
        };
        const expectedState = {
          streams: testValue
        };

        expect(wrapper.state()).toStrictEqual(defaultState);
        wrapper.instance().handleStreamsChange(testValue);
        expect(wrapper.state()).toStrictEqual(expectedState);
      });
    });

    describe("render() function", () => {
      describe("Should contain the following component", () => {
        it("contains 1 <StreamTable/> component with expected props", () => {
          const table = wrapper.find(StreamTable);
          expect(table).toHaveLength(1);

          const wrapperProps = wrapper.props();
          const wrapperState = wrapper.state();
          const expected = {
            columns: wrapperProps.columns,
            streams: wrapperState.streams
          };

          const tableProps = table.props();
          expect(tableProps).toStrictEqual(expected);
        });
      });
    });
  });
});
