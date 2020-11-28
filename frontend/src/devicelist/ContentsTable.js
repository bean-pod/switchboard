import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

import VerticalTabs from "./VerticalTabs";
import TabPanel from "./TabPanel";
import DevicesDataTable from "./DevicesDataTable";

export default class ContentsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      senders: [],
      receivers: [],
      value: 0
    };
    this.dataSource = props.dataSource;
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSendersChange = this.handleSendersChange.bind(this);
    this.handleReceiversChange = this.handleReceiversChange.bind(this);
  }

  componentDidMount() {
    this.dataSource.getSenders(this.handleSendersChange);
    this.dataSource.getReceivers(this.handleReceiversChange);
  }

  handleValueChange(tabIndex) {
    this.setState({
      value: tabIndex
    });
  }

  handleSendersChange(senders) {
    this.setState({
      senders
    });
  }

  handleReceiversChange(receivers) {
    this.setState({
      receivers
    });
  }

  render() {
    return (
      <>
        <Box
          style={{
            display: "flex",
            flexGrow: 1,
            maxHeight: 500,
          }}
          border={1}
          borderColor="#f1f1f1"
        >
          <VerticalTabs
            value={this.state.value}
            setValue={this.handleValueChange}
            classes={this.props.classes}
          />
          <TabPanel value={this.state.value} index={0}>
            <DevicesDataTable
              devices={this.state.senders}
              title="List of Senders"
            />
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <DevicesDataTable
              devices={this.state.receivers}
              title="List of Receivers"
            />
          </TabPanel>
        </Box>
      </>
    );
  }
}
