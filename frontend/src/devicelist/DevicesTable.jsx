import React from "react";
import { Box, TableContainer, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

import {
  FilterList,
  Search,
  ExpandLess,
  ExpandMore,
  ArrowDownward,
  Clear,
  SaveAlt,
  FirstPage,
  LastPage,
  ChevronRight,
  ChevronLeft
} from "@material-ui/icons";

import MaterialTable, { MTableToolbar } from "material-table";

import ChannelDetailsTable from "./ChannelDetailsTable";
import StatusIndicator from "../general/StatusIndicator";
import ActionMenu from "./ActionMenu";
import DeviceInfo from "../model/DeviceInfo";

export default class DevicesTable extends React.Component {
  static getComponents() {
    /*  eslint-disable react/jsx-props-no-spreading */
    return {
      Toolbar: (props) => (
        <div className="lightestGrey">
          <MTableToolbar {...props} />
        </div>
      )
    };
  }

  static getColumnInfo() {
    return [
      {
        title: "Name",
        field: "name"
      },
      {
        title: "Serial Number",
        field: "serialNumber"
      },
      {
        title: "Status",
        field: "status",
        render: (rowData) => <StatusIndicator status={rowData.status} />,
        lookup: {
          Online: "Online",
          Pending: "Pending",
          Error: "Error",
          Offline: "Offline"
        }
      },
      {
        title: "IP Address",
        field: "ip"
      },
      {
        title: "Actions",
        field: "action",
        filtering: false,
        sorting: false,
        render: () => <ActionMenu />,
        align: "center",
        export: false
      }
    ];
  }

  static getDetailPanel() {
    return [
      {
        icon: ExpandMore,
        openIcon: ExpandLess,
        tooltip: "Show Device Details",
        render: (rowData) => {
          return (
            <div className="lightestGrey">
              <Box margin={2}>
                <Typography variant="h6">Channels</Typography>
                <ChannelDetailsTable channels={rowData.channels} />
              </Box>
            </div>
          );
        }
      }
    ];
  }

  static getOptions() {
    return {
      toolbar: true,
      search: true,
      exportButton: true,
      headerStyle: {
        backgroundColor: "#f1f1f1",
        fontWeight: "bold"
        // position: 'sticky', top: 0
      },
      // maxBodyHeight: '650px',
      // above lines commented out b/c scrollbar bug, see: https://github.com/mbrn/material-table/issues/780
      actionsColumnIndex: -1,
      filtering: true,
      draggable: false
    };
  }

  static getIcons() {
    return {
      Filter: FilterList,
      Search,
      ResetSearch: Clear,
      SortArrow: ArrowDownward,
      Export: SaveAlt,
      FirstPage,
      LastPage,
      NextPage: ChevronRight,
      PreviousPage: ChevronLeft
    };
  }

  render() {
    const { title, devices } = this.props;
    return (
      <>
        <Box>
          <TableContainer style={{ maxHeight: 570 }}>
            <MaterialTable
              title={title}
              components={DevicesTable.getComponents()}
              columns={DevicesTable.getColumnInfo()}
              data={devices}
              detailPanel={DevicesTable.getDetailPanel()}
              options={DevicesTable.getOptions()}
              icons={DevicesTable.getIcons()}
            />
          </TableContainer>
        </Box>
      </>
    );
  }
}

DevicesTable.propTypes = {
  title: PropTypes.string.isRequired,
  devices: PropTypes.arrayOf(PropTypes.instanceOf(DeviceInfo)).isRequired
};
