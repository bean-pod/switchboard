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
import { Box, TableContainer, Typography } from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore,
  ArrowDownward,
  FirstPage,
  LastPage,
  ChevronRight,
  ChevronLeft
} from "@material-ui/icons";
import MaterialTable from "material-table";
import StreamsTable from "../StreamsTable";
import DeleteStreamDialogOpener from "../DeleteStreamDialogOpener";
import StatusIndicator from "../../general/StatusIndicator";

Enzyme.configure({ adapter: new Adapter() });
jest.spyOn(global.console, "error");

describe("<StreamsTable/> component", () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("has the correct components", () => {
    const dummyStreams = [];
    beforeEach(() => {
      wrapper = Enzyme.shallow(<StreamsTable streamDetails={dummyStreams} />);
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
    wrapper = Enzyme.shallow(<StreamsTable streams={dummyStreams} />);
    const result = wrapper.instance().getColumnInfo();
    const expected = [
      {
        title: "ID",
        field: "id"
      },
      {
        title: "Date",
        field: "date"
      },
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
        title: "Type",
        field: "type"
      },
      {
        title: "Time Elapsed",
        field: "time"
      },
      {
        title: "Actions",
        field: "action",
        filtering: false,
        sorting: false,
        render: function Actions(rowData) {
          return <DeleteStreamDialogOpener deleteId={rowData.id} />;
        },
        align: "center",
        export: false
      }
    ];

    describe("Returns an array of objects", () => {
      describe("index [0] info for field'ID'", () => {
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
      describe("index [2] info", () => {
        it(`should have title "${expected[2].title}"`, () => {
          expect(result[2].title).toBe(expected[2].title);
        });
        it(`should have field "${expected[2].field}"`, () => {
          expect(result[2].field).toBe(expected[2].field);
        });
      });
      describe("index [3] info", () => {
        it(`should have title "${expected[3].title}"`, () => {
          expect(result[3].title).toBe(expected[3].title);
        });
        it(`should have field "${expected[3].field}"`, () => {
          expect(result[3].field).toBe(expected[3].field);
        });
      });
      describe("index [4] info'", () => {
        it(`should have title "${expected[4].title}"`, () => {
          expect(result[4].title).toBe(expected[4].title);
        });
        it(`should have field "${expected[4].field}"`, () => {
          expect(result[4].field).toBe(expected[4].field);
        });
        it(`should have a render() function that returns a <StatusIndicator/> component`, () => {
          const dummyData = {
            status: "Online"
          };
          const renderResult = result[4].render(dummyData);
          expect(renderResult).toMatchObject(expected[4].render(dummyData));
        });
      });
      describe("index [5] info", () => {
        it(`should have title "${expected[5].title}"`, () => {
          expect(result[5].title).toBe(expected[5].title);
        });
        it(`should have field "${expected[5].field}"`, () => {
          expect(result[5].field).toBe(expected[5].field);
        });
      });
      describe("index [6] info", () => {
        it(`should have title "${expected[6].title}"`, () => {
          expect(result[6].title).toBe(expected[6].title);
        });
        it(`should have field "${expected[6].field}"`, () => {
          expect(result[6].field).toBe(expected[6].field);
        });
      });
      describe("index [7] info", () => {
        it(`should have title "${expected[7].title}"`, () => {
          expect(result[7].title).toBe(expected[7].title);
        });
        it(`should have field "${expected[7].field}"`, () => {
          expect(result[7].field).toBe(expected[7].field);
        });
        it(`should have filtering "${expected[7].filtering}"`, () => {
          expect(result[7].filtering).toBe(expected[7].filtering);
        });
        it(`should have sorting "${expected[7].sorting}"`, () => {
          expect(result[7].sorting).toBe(expected[7].sorting);
        });
        it(`should have align "${expected[7].align}"`, () => {
          expect(result[7].align).toBe(expected[7].align);
        });
        it(`should have export "${expected[7].export}"`, () => {
          expect(result[7].export).toBe(expected[7].export);
        });
        it(`should have a render() function that returns a <DeleteStreamSummoner/> component`, () => {
          const dummyData = {
            id: 444
          };
          const renderResult = result[7].render(dummyData);
          expect(renderResult).toMatchObject(expected[7].render(dummyData));
        });
      });
    });
  });

  describe("getDetailPanel() function to return an array", () => {
    const dummyStreams = [null];
    wrapper = Enzyme.shallow(<StreamsTable streams={dummyStreams} />);
    const result = wrapper.instance().getDetailPanel();
    const getDetailPanelExpectedResult = [
      {
        icon: ExpandMore,
        openIcon: ExpandLess,
        tooltip: "Show Stream Details",
        render: function DetailPanel(rowData) {
          return (
            <div className="lightestGrey">
              <Typography variant="h6">{rowData.extras}</Typography>
            </div>
          );
        }
      }
    ];
    describe("containing a single object", () => {
      expect(result.length).toBe(1);
      expect(typeof result[0]).toBe("object");
      it("has a property icon which has value ExpandMore", () => {
        expect(result[0].icon).toBe(ExpandMore);
      });
      it("has a property openIcon which has value ExpandLess", () => {
        expect(result[0].openIcon).toBe(ExpandLess);
      });
      it("has a property tooltip which has value: the expected message", () => {
        expect(result[0].tooltip).toBe(getDetailPanelExpectedResult[0].tooltip);
      });
      it(`should have a render() function returns a predefined component`, () => {
        const dummyData = {
          extras: 444
        };
        const renderResult = result[0].render(dummyData);
        expect(renderResult).toMatchObject(
          getDetailPanelExpectedResult[0].render(dummyData)
        );
      });
    });
  });

  describe("getOptions() function", () => {
    const dummyStreams = [null];
    wrapper = Enzyme.shallow(<StreamsTable streams={dummyStreams} />);
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
    wrapper = Enzyme.shallow(<StreamsTable streams={dummyStreams} />);
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
