import React from "react";
import { Container, Paper, Tab, Tabs } from "@material-ui/core";
import PropTypes from "prop-types";

import TabPanel from "../general/TabPanelH";
import DeviceDetailsConciseTable from "./DeviceDetailsConciseTable";
import DeviceDetailsActivityPanel from "./DeviceDetailsActivityPanel";
import DeviceDetailsNotesPanel from "./DeviceDetailsNotesPanel";
import DeviceInfo from "../model/DeviceInfo";

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

  getPanelContents(tabInfo) {
    const { device } = this.props;
    switch (tabInfo) {
      case "Overview":
        return <DeviceDetailsConciseTable device={device} />;
      case "Activity Log":
        return <DeviceDetailsActivityPanel device={device} />;
      case "Notes":
        return <DeviceDetailsNotesPanel device={device} />;

      default:
        return <div />;
    }
  }

  render() {
    const { value, device, tabs } = this.props;
    return (
      <Container component={Paper}>
        <Tabs
          value={value}
          onChange={this.handleValueChange}
          className="lightGrey blackFont flexContents"
          indicatorColor="primary"
          textColor="primary"
          aria-label="full width tabs example"
        >
          {tabs.map((tabInfo, index) => {
            return <Tab label={tabInfo} key={tabInfo} />;
          })}
        </Tabs>
        {tabs.map((tabInfo, index) => {
          return (
            <TabPanel value={this.state.value} index={index} device={device}>
              {this.getPanelContents(tabInfo)}
            </TabPanel>
          );
        })}
      </Container>
    );
  }
}
DeviceDetailsTabTable.propTypes = {
  value: PropTypes.number.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
