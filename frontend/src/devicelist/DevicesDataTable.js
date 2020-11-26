import React from "react";
import {
  Box,
  TableContainer,
} from "@material-ui/core";

import { FilterList } from "@material-ui/icons";

import MaterialTable from "material-table";

export default class DevicesTable extends React.Component {
  constructor(props) {
    super(props);
  }

  getColumnInfo() {
    return [
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Serial Number",
        field: "serialNumber",
      },
      {
        title: "Status",
        field: "status",
      },
      {
        title: "IP Address",
        field: "ip",
      },
    ];
  }

  render() {
    return (
      <>
        <Box>
          <TableContainer style={{ maxHeight: 500 }}>
            <MaterialTable
                columns={this.getColumnInfo()}
                data={this.props.devices}
                detailPanel={[
                  {
                    render: rowData => {
                      return (
                        <iframe
                          width="100%"
                          height="315"
                          src="https://www.youtube.com/embed/C0DPdy98e4c"
                          frameborder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        />
                      )
                    },
                  },
                ]}        
                options={{
                    toolbar: false,
                    filtering: true,
                    paging: false,
                }}
                icons={{
                  Filter: FilterList,
                }}
            />
          </TableContainer>
        </Box>
      </>
    );
  }
}
