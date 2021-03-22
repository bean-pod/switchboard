import React from "react";
import { Container, Tab, Tabs } from "@material-ui/core";
import PropTypes from "prop-types";

import HorizontalTabPanel from "../general/HorizontalTabPanel";
import DeviceDetailsActivityPanel from "./TabPanels/DeviceDetailsActivityPanel";
import DeviceDetailsNotesPanel from "./TabPanels/DeviceDetailsNotesPanel";
import DeviceInfo from "../model/DeviceInfo";
import DeviceInfoTable from "./DeviceDetailsTable";

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

  static getPanelContents(tabInfo, device) {
    switch (tabInfo) {
      case "Overview":
        return <DeviceInfoTable device={device} />;
      case "Activity Log":
        return <DeviceDetailsActivityPanel device={device} />;
      case "Notes":
        return <DeviceDetailsNotesPanel extras={device.extras} />;

      default:
        return <div>Whoops not a valid value</div>;
    }
  }

  render() {
    const { value } = this.state;
    const { device, tabs } = this.props;
    return (
      <Container>
        <Tabs
          value={value}
          onChange={this.handleValueChange}
          className="lightGrey blackFont flexContents"
          indicatorColor="primary"
          textColor="primary"
        >
          {tabs.map((tabInfo) => {
            let tab;
            if (tabInfo === "Overview") {
              tab = (
                <Tab
                  label={tabInfo}
                  key={tabInfo}
                  style={{ pointerEvents: "none" }}
                />
              );
            } else {
              tab = <Tab label={tabInfo} key={tabInfo} />;
            }
            return tab;
          })}
        </Tabs>
        {tabs.map((tabInfo, index) => {
          return (
            <HorizontalTabPanel
              value={value}
              key={tabInfo}
              index={index}
              device={device}
            >
              {DeviceDetailsTabTable.getPanelContents(tabInfo, device)}
            </HorizontalTabPanel>
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
