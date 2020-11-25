import React from "react";
import { Container, Paper, Tab, Tabs } from "@material-ui/core";
import PropTypes from "prop-types";

import TabPanel from "../General/TabPanelH";
import DeviceDetailsConciseTable from "./DeviceDetailsConciseTable";
import DeviceDetailsActivityPanel from "./DeviceDetailsActivityPanel";
import DeviceDetailsNotesPanel from "./DeviceDetailsNotesPanel";

export default class DeviceDetailsTabTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(event, tabIndex) {
    this.setState({
      value: tabIndex
    });
  }

  getTabProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    };
  }

  getPanelContents(tabInfo) {
    ["Overview", "Activity Log", "Notes"];
    switch (tabInfo) {
      case "Overview":
        return <DeviceDetailsConciseTable device={this.props.device} />;
      case "Activity Log":
        return <DeviceDetailsActivityPanel device={this.props.device} />;
      case "Notes":
        return <DeviceDetailsNotesPanel device={this.props.device} />;

      default:
        return <div />;
    }
  }

  render() {
    return (
      <Container component={Paper}>
        <Tabs
          value={this.props.value}
          onChange={this.handleValueChange}
          class="lightGrey blackFont flexContents"
          indicatorColor="primary"
          textColor="primary"
          aria-label="full width tabs example"
        >
          {this.props.tabs.map((tabInfo, index) => {
            console.log(this.state.value);
            return <Tab label={tabInfo} {...this.getTabProps(index)} />;
          })}
        </Tabs>
        {this.props.tabs.map((tabInfo, index) => {
          return (
            <TabPanel
              value={this.state.value}
              index={index}
              device={this.props.device}
            >
              {this.getPanelContents(tabInfo)}
            </TabPanel>
          );
        })}
      </Container>
    );
  }
}
DeviceDetailsTabTable.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
