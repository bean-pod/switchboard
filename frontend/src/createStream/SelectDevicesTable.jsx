import React from "react";
import { List } from "@material-ui/core";

import PropTypes from "prop-types";
import SearchBar from "../devicelist/SearchBar";
import SelectDeviceTableRow from "./SelectDeviceTableRow";

export default class SelectDevicesTable extends React.Component {
  render() {
    const { dataSource, name, onChange } = this.props;
    return (
      <>
        <div className="subtitle">{name}</div>
        <SearchBar />
        <div style={{ maxHeight: "300px", overflow: "auto" }}>
          <List>
            {dataSource.map((device) => {
              return (
                <SelectDeviceTableRow
                  deviceDetails={device}
                  key={device.serialNumber}
                  onChange={onChange}
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
