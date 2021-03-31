import React from "react";
import { AppBar, Tab, Tabs as MuiTabs } from "@material-ui/core";
import PropTypes from "prop-types";

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, newTab) {
    const { setValue } = this.props;
    setValue(newTab);
  }

  render() {
    const { value } = this.props;

    return (
      <AppBar position="static" color="default" elevation={10}>
        <MuiTabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
        >
          <Tab label="Senders" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="Receivers" id="tab-1" aria-controls="tabpanel-1" />
        </MuiTabs>
      </AppBar>
    );
  }
}

Tabs.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};
