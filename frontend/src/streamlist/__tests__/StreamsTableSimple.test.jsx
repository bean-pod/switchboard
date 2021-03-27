import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  it
} from "@jest/globals";
import { Box, TableContainer } from "@material-ui/core";
import {
  ArrowDownward,
  FirstPage,
  LastPage,
  ChevronRight,
  ChevronLeft
} from "@material-ui/icons";
import MaterialTable from "material-table";
import StreamsTableSimple from "../StreamsTableSimple";
import StreamDetailsButton from "../StreamDetailsButton";
import StatusIndicator from "../../general/StatusIndicator";

Enzyme.configure({ adapter: new Adapter() });
jest.spyOn(global.console, "error");

describe("<StreamsTableSimple/> component", () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe("has the correct components", () => {
    const dummyStreams = [];
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <StreamsTableSimple streamDetails={dummyStreams} />
      );
    });
    it("contains one Box component", () => {
      expect(wrapper.find(Box)).toHaveLength(1);
    });
    it("contains one TableContainer component", () => {
      expect(wrapper.find(TableContainer)).toHaveLength(1);
    });
    it("contains one MaterialTable component", () => {
      expect(wrapper.find(MaterialTable)).toHaveLength(1);
    });
    it("contains one Time zone indicator text box", () => {
      expect(
        wrapper
          .text()
          .includes(
            "Time Zone: ".concat(
              Intl.DateTimeFormat().resolvedOptions().timeZone
            )
          )
      ).toBe(true);
    });
  });

  describe("getColumnInfo() function", () => {
    const dummyStreams = [null];
    wrapper = Enzyme.shallow(<StreamsTableSimple streams={dummyStreams} />);
    const result = wrapper.instance().getColumnInfo();
    const expected = [
      {
        title: "Sender",
        field: "sender.name"
      },
      {
        title: "Receiver",
        field: "receiver.name"
      },
      {
        title: "Status",
        field: "status",
        render: function Status(rowData) {
          return <StatusIndicator status={rowData.status} />;
        }
      },
      {
        title: "Actions",
        field: "action",
        filtering: false,
        sorting: false,
        render: function Actions(rowData) {
          return <StreamDetailsButton streamInfo={rowData} />;
        },
        align: "center",
        export: false
      }
    ];

    describe("Returns an array of objects", () => {
      describe("index [0] info", () => {
        it(`should have title "${expected[0].title}"`, () => {
          expect(result[0].title).toBe(expected[0].title);
        });
        it(`should have field "${expected[0].field}"`, () => {
          expect(result[0].field).toBe(expected[0].field);
        });
      });
      describe("index [1] info", () => {
        it(`should have title "${expected[1].title}"`, () => {
          expect(result[1].title).toBe(expected[1].title);
        });
        it(`should have field "${expected[1].field}"`, () => {
          expect(result[1].field).toBe(expected[1].field);
        });
      });
      describe("index [2] info'", () => {
        it(`should have title "${expected[2].title}"`, () => {
          expect(result[2].title).toBe(expected[2].title);
        });
        it(`should have field "${expected[2].field}"`, () => {
          expect(result[2].field).toBe(expected[2].field);
        });
        it(`should have a render() function that returns a <StatusIndicator/> component`, () => {
          const dummyData = {
            status: "Online"
          };
          const renderResult = result[2].render(dummyData);
          expect(renderResult).toMatchObject(expected[2].render(dummyData));
        });
      });
      describe("index [3] info", () => {
        it(`should have title "${expected[3].title}"`, () => {
          expect(result[3].title).toBe(expected[3].title);
        });
        it(`should have field "${expected[3].field}"`, () => {
          expect(result[3].field).toBe(expected[3].field);
        });
        it(`should have filtering "${expected[3].filtering}"`, () => {
          expect(result[3].filtering).toBe(expected[3].filtering);
        });
        it(`should have sorting "${expected[3].sorting}"`, () => {
          expect(result[3].sorting).toBe(expected[3].sorting);
        });
        it(`should have align "${expected[3].align}"`, () => {
          expect(result[3].align).toBe(expected[3].align);
        });
        it(`should have export "${expected[3].export}"`, () => {
          expect(result[3].export).toBe(expected[3].export);
        });
        it(`should have a render() function that returns a <StreamDetailsButton/> component`, () => {
          const dummyData = {
            streamInfo: dummyStreams[0]
          };
          const renderResult = result[3].render(dummyData);
          expect(renderResult).toMatchObject(expected[3].render(dummyData));
        });
      });
    });
  });

  describe("getOptions() function", () => {
    const dummyStreams = [null];
    wrapper = Enzyme.shallow(<StreamsTableSimple streams={dummyStreams} />);
    const result = wrapper.instance().getOptions();
    const expected = {
      toolbar: false,
      headerStyle: {
        backgroundColor: "#f1f1f1",
        fontWeight: "bold"
      },
      filtering: false,
      draggable: false
    };

    describe("returns an object", () => {
      expect(typeof result).toBe("object");

      it(`that has a property toolbar which has value: ${expected.toolbar}`, () => {
        expect(result.toolbar).toBe(expected.toolbar);
      });
      describe(`that has a property headerStyle which is an object`, () => {
        expect(typeof result.headerStyle).toBe("object");
        it(`that has a property backgroundColor which has value: ${expected.headerStyle.backgroundColor}`, () => {
          expect(result.headerStyle.backgroundColor).toBe(
            expected.headerStyle.backgroundColor
          );
        });
        it(`that has a property fontWeight which has value: ${expected.headerStyle.fontWeight}`, () => {
          expect(result.headerStyle.fontWeight).toBe(
            expected.headerStyle.fontWeight
          );
        });
      });
      it(`that has a property filtering which has value: ${expected.filtering}`, () => {
        expect(result.filtering).toBe(expected.filtering);
      });
      it(`that has a property draggable which has value: ${expected.draggable}`, () => {
        expect(result.draggable).toBe(expected.draggable);
      });
    });
  });

  describe("getIcons() function", () => {
    const dummyStreams = [null];
    wrapper = Enzyme.shallow(<StreamsTableSimple streams={dummyStreams} />);
    const result = wrapper.instance().getIcons();
    const expected = {
      SortArrow: ArrowDownward,
      FirstPage,
      LastPage,
      NextPage: ChevronRight,
      PreviousPage: ChevronLeft
    };
    describe("returns an object", () => {
      expect(typeof result).toBe("object");
      it(`that has a property SortArrow which has value: ${expected.SortArrow}`, () => {
        expect(result.SortArrow).toBe(expected.SortArrow);
      });
      it(`that has a property FirstPage which has value: ${expected.FirstPage}`, () => {
        expect(result.FirstPage).toBe(expected.FirstPage);
      });
      it(`that has a property LastPage which has value: ${expected.LastPage}`, () => {
        expect(result.LastPage).toBe(expected.LastPage);
      });
      it(`that has a property NextPage which has value: ${expected.NextPage}`, () => {
        expect(result.NextPage).toBe(expected.NextPage);
      });
      it(`that has a property PreviousPage which has value: ${expected.PreviousPage}`, () => {
        expect(result.PreviousPage).toBe(expected.PreviousPage);
      });
    });
  });
});
