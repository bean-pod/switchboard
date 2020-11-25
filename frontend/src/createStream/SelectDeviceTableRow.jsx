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

export default class SelectDeviceTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <>
        <ListItem button dense onClick={this.onClick}>
          <ListItemText primary={this.props.deviceDetails.name} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding style={{ width: "96%" }}>
            <ListItem divider>
              <ListItemText secondary="Select Channel" />
              <Select defaultValue="" onChange={this.props.onChange}>
                {this.props.deviceDetails.channels.map((channel) => {
                  return (
                    <MenuItem
                      value={channel.id}
                      key={`${this.props.deviceDetails.name}_${channel.id}`}
                    >
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
  deviceDetails: PropTypes.shape({
    name: PropTypes.string,
    channels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        port: PropTypes.number
      })
    )
  }).isRequired,
  onChange: PropTypes.func.isRequired
};
