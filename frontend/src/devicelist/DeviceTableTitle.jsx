import React from "react";
import PropTypes from "prop-types";
import { MenuItem, Select } from "@material-ui/core";
import StyledInput from "./StyledInput";

export default class DeviceTableTitle extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { handleChange } = this.props;
    handleChange(event.target.value);
  }

  render() {
    const { index } = this.props;
    return (
      <Select
        id="device-table-title-select"
        value={index}
        onChange={this.handleChange}
        input={<StyledInput />}
      >
        <MenuItem value={0}>All Devices</MenuItem>
        <MenuItem value={1}>Senders</MenuItem>
        <MenuItem value={2}>Receivers</MenuItem>
      </Select>
    );
  }
}

DeviceTableTitle.propTypes = {
  index: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
};
