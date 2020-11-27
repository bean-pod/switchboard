import React from "react";
import { Box, TableContainer, Typography } from "@material-ui/core";

import {
  FilterList,
  Search,
  MoreVert,
  ExpandLess,
  ExpandMore,
  ArrowDownward,
  Clear,
  SaveAlt
} from "@material-ui/icons";

import MaterialTable from "material-table";

import ChannelDetailsTable from "./ChannelDetailsTable";
import StatusIndicator from "../StatusIndicator";
import ActionMenu from "./ActionMenu";

export default class DevicesTable extends React.Component {
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
            <div
              style={{
                backgroundColor: "#FAFAFA"
              }}
            >
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

  getActions() {
    return [
      {
        icon: MoreVert,
        tooltip: "Show Actions",
        onClick: (event, rowData) => {
          // show dropdown
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
        backgroundColor: "#FAFAFA"
        // position: 'sticky', top: 0
      },
      // maxBodyHeight: '650px',
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
              columns={this.getColumnInfo()}
              data={this.props.devices}
              detailPanel={this.getDetailPanel()}
              actions={this.getActions()}
              options={this.getOptions()}
              icons={this.getIcons()}
            />
          </TableContainer>
        </Box>
      </>
    );
  }
}
