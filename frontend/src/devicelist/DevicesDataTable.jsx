import React from "react";
import { Box, TableContainer, Typography } from "@material-ui/core";

import {
  FilterList,
  Search,
  ExpandLess,
  ExpandMore,
  ArrowDownward,
  Clear,
  SaveAlt
} from "@material-ui/icons";

import MaterialTable, { MTableToolbar } from "material-table";

import ChannelDetailsTable from "./ChannelDetailsTable";
import StatusIndicator from "../StatusIndicator";
import ActionMenu from "./ActionMenu";

export default class DevicesTable extends React.Component {
  getComponents() {
    return {
      Toolbar: (props) => (
        <div style={{ backgroundColor: "#f9f9f9" }}>
          <MTableToolbar {...props} />
        </div>
      )
    };
  }

  getColumnInfo() {
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
        render: (rowData) => <ActionMenu />,
        align: "center"
      }
    ];
  }

  getDetailPanel() {
    return [
      {
        icon: ExpandMore,
        openIcon: ExpandLess,
        tooltip: "Show Device Details",
        render: (rowData) => {
          return (
            <div style={{ backgroundColor: "#f9f9f9" }}>
              <Box margin={2}>
                <Typography variant="h6">Channels</Typography>
                {rowData.channels.map((channel) => {
                  return (
                    <ChannelDetailsTable
                      channel={channel}
                      key={`ch_${channel.id}_p${channel.port}`}
                    />
                  );
                })}
              </Box>
            </div>
          );
        }
      }
    ];
  }

  getOptions() {
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
      // above commented out b/c scrollbar bug, see: https://github.com/mbrn/material-table/issues/780
      actionsColumnIndex: -1,
      filtering: true,
      paging: false,
      draggable: false
    };
  }

  getIcons() {
    return {
      Filter: FilterList,
      Search,
      ResetSearch: Clear,
      SortArrow: ArrowDownward,
      Export: SaveAlt
    };
  }

  render() {
    return (
      <>
        <Box>
          <TableContainer style={{ maxHeight: 500 }}>
            <MaterialTable
              title={this.props.title}
              components={this.getComponents()}
              columns={this.getColumnInfo()}
              data={this.props.devices}
              detailPanel={this.getDetailPanel()}
              options={this.getOptions()}
              icons={this.getIcons()}
            />
          </TableContainer>
        </Box>
      </>
    );
  }
}
