import React from "react";
import { NavLink } from "react-router-dom";
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

function getComponents() {
  return {
    /*  eslint-disable react/jsx-props-no-spreading */
    Toolbar: function Components(props) {
      return (
        <div className="lightestGrey">
          <MTableToolbar {...props} />
        </div>
      );
    }
  };
}

function buildNavlink(deviceInfo) {
  return (
    <NavLink
      to={{
        pathname: `/Devices/Details/${deviceInfo.name}`,
        state: { device: deviceInfo }
      }}
      className="invisibleLink"
    >
      {deviceInfo.name}
    </NavLink>
  );
}

function getColumnInfo() {
  return [
    {
      title: "Name",
      field: "name",
      render: (rowData) => buildNavlink(rowData)
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
        return <ActionMenu device={rowData} />;
      },
      align: "center",
      export: false
    }
  ];
}

function getDetailPanel() {
  return [
    {
      icon: ExpandMore,
      openIcon: ExpandLess,
      tooltip: "Show Device Details",
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
}

function getOptions() {
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

function getIcons() {
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

export default function DevicesTable(props) {
  const { title, devices } = props;
  return (
    <>
      <Box>
        <TableContainer style={{ maxHeight: 570 }}>
          <MaterialTable
            title={title}
            components={getComponents()}
            columns={getColumnInfo()}
            data={devices}
            detailPanel={getDetailPanel()}
            options={getOptions()}
            icons={getIcons()}
          />
        </TableContainer>
      </Box>
    </>
  );
}

DevicesTable.propTypes = {
  title: PropTypes.string.isRequired,
  devices: PropTypes.arrayOf(PropTypes.instanceOf(DeviceInfo)).isRequired
};
