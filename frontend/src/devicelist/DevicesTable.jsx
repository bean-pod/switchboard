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
import DeviceInfo from "../model/DeviceInfo";
import DeviceDetailsButton from "./DeviceDetailsButton";

export default class DevicesTable extends React.Component {
  constructor(props) {
    super(props);
    this.components = {
      /*  eslint-disable react/jsx-props-no-spreading */
      Toolbar: function Components(passedProps) {
        return (
          <div className="lightestGrey">
            <MTableToolbar {...passedProps} />
          </div>
        );
      }
    };
    this.columns = [
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
        render: function Status(rowData) {
          return <StatusIndicator status={rowData.status} />;
        },
        lookup: {
          Online: "Online",
          Pending: "Pending",
          Error: "Error",
          Offline: "Offline"
        }
      },
      {
        title: "Private IP Address",
        field: "privateIp"
      },
      {
        title: "Public IP Address",
        field: "publicIp"
      },
      {
        title: "Actions",
        field: "action",
        filtering: false,
        sorting: false,
        render: function Actions(rowData) {
          return <DeviceDetailsButton deviceInfo={rowData} />;
        },
        align: "center",
        export: false
      }
    ];
    this.detailPanel = [
      {
        icon: ExpandMore,
        openIcon: ExpandLess,
        tooltip: "Show Channels",
        render: function DetailPanel(rowData) {
          return (
            <div className="lightestGrey" style={{ padding: "1.5em" }}>
              <Typography variant="h6">Channels</Typography>
              <ChannelDetailsTable channels={rowData.channels} />
            </div>
          );
        }
      }
    ];
    this.options = {
      toolbar: true,
      search: true,
      exportButton: true,
      headerStyle: {
        backgroundColor: "#f1f1f1",
        fontWeight: "bold"
      },
      filtering: true,
      draggable: false
    };
    this.icons = {
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
              components={this.components}
              columns={this.columns}
              data={devices}
              detailPanel={this.detailPanel}
              options={this.options}
              icons={this.icons}
            />
          </TableContainer>
        </Box>
      </>
    );
  }
}

DevicesTable.propTypes = {
  title: PropTypes.node.isRequired,
  devices: PropTypes.arrayOf(PropTypes.instanceOf(DeviceInfo)).isRequired
};
