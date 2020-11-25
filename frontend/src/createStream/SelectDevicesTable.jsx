import React from "react";
import { List } from "@material-ui/core";

import PropTypes from "prop-types";
import SearchBar from "../devicelist/SearchBar";
import SelectDeviceTableRow from "./SelectDeviceTableRow";

export default class SelectDevicesTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="subtitle">{this.props.name}</div>
        <SearchBar />
        <div style={{ maxHeight: "300px", overflow: "auto" }}>
          <List>
            {this.props.dataSource.map((device) => {
              return (
                <SelectDeviceTableRow
                  deviceDetails={device}
                  key={device.serialNumber}
                  onChange={this.props.onChange}
                />
              );
            })}
          </List>
        </div>
      </>
    );
  }
}
SelectDevicesTable.propTypes = {
  name: PropTypes.string.isRequired,
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      serialNumber: PropTypes.string,
      status: PropTypes.string,
      ip: PropTypes.string,
      channels: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          port: PropTypes.number
        })
      )
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired
};
