import React from "react";
import { Box } from "@material-ui/core";

import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import DeviceListSortSelector from "./DeviceListSortSelector";
import VerticalTabs from "./VerticalTabs";
import TabPanel from "./TabPanel";
import DevicesTable from "./DevicesTable";

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
        <Box style={{ display: "flex", flexGrow: 1, margin: "1em 0em" }}>
          <SearchBar />
          <Box className="alignRightFloat">
            <DeviceListSortSelector />
          </Box>
        </Box>
        <Box style={{ display: "flex", flexGrow: 1, maxHeight: 500 }}>
          <VerticalTabs
            value={this.state.value}
            setValue={this.handleValueChange}
            classes={this.props.classes}
          />
          <TabPanel value={this.state.value} index={0}>
            <DevicesTable devices={this.state.senders} />
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <DevicesTable devices={this.state.receivers} />
          </TabPanel>
        </Box>
      </>
    );
  }
}
ContentsTable.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired,
  classes: PropTypes.shape({
    tabs: PropTypes.string
  }).isRequired
};
