import React from "react";
import PropTypes from "prop-types";

import TabPanel from "./TabPanel";
import DevicesTable from "./DevicesTable";
import Tabs from "../general/VerticalTabs";

export default class DeviceListTabTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      senders: [],
      receivers: [],
      value: 0
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSendersChange = this.handleSendersChange.bind(this);
    this.handleReceiversChange = this.handleReceiversChange.bind(this);
  }

  componentDidMount() {
    const { dataSource } = this.props;
    dataSource.getSenders(this.handleSendersChange);
    dataSource.getReceivers(this.handleReceiversChange);
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
    const { receivers, senders, value } = this.state;
    return (
      <>
        <Tabs value={value} setValue={this.handleValueChange} />
        <TabPanel value={value} index={0}>
          <DevicesTable devices={senders} title="List of Senders" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DevicesTable devices={receivers} title="List of Receivers" />
        </TabPanel>
      </>
    );
  }
}
DeviceListTabTable.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired,
  classes: PropTypes.shape({
    tabs: PropTypes.string
  }).isRequired
};
