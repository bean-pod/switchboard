import React from "react";
import { Container, Tab, Tabs } from "@material-ui/core";
import TabPanel from "../General/TabPanelH";

export default class DeviceDetailsTabTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(event,tabIndex) {
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

  render() {
    return (
      <Container>
        <Tabs
          value={this.props.value}
          onChange={this.handleValueChange}
          class="lightGrey blackFont flexContents"
          variant="scrollable"
        >
          {this.props.tabs.map((tabInfo, index) => {
            console.log(this.state.value);
            return <Tab label={tabInfo} {...this.getTabProps(index)} />;
          })}
        </Tabs>
        {this.props.tabs.map((tabInfo, index) => {
          return (
            <TabPanel value={this.state.value} index={index}>
              {index}
            </TabPanel>
          );
        })}
      </Container>
    );
  }
}
