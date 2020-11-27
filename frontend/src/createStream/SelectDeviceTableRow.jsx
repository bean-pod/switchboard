import React from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons/";
import PropTypes from "prop-types";
import DeviceInfo from "../model/DeviceInfo";

export default class SelectDeviceTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState((state) => ({ open: !state.open }));
  }

  render() {
    const {
      deviceDetails: { channels, name },
      onChange
    } = this.props;
    const { open } = this.state;
    return (
      <>
        <ListItem button dense onClick={this.onClick}>
          <ListItemText primary={name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding style={{ width: "96%" }}>
            <ListItem divider>
              <ListItemText secondary="Select Channel" />
              <Select defaultValue="" onChange={onChange}>
                {channels.map((channel) => {
                  return (
                    <MenuItem value={channel.id} key={`${name}_${channel.id}`}>
                      {channel.port}
                    </MenuItem>
                  );
                })}
              </Select>
            </ListItem>
          </List>
        </Collapse>
      </>
    );
  }
}
SelectDeviceTableRow.propTypes = {
  deviceDetails: PropTypes.instanceOf(DeviceInfo).isRequired,
  onChange: PropTypes.func.isRequired
};
