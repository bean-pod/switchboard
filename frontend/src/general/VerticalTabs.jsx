import React from "react";
import { Tab, Tabs } from "@material-ui/core";
import PropTypes from "prop-types";

export default class VerticalTabs extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, newTab) {
    const { setValue } = this.props;
    setValue(newTab);
  }

  getTabProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`
    };
  }

  render() {
    const {
      value,
      classes: { tabs }
    } = this.props;
    return (
      <>
        <Tabs
          value={value}
          onChange={this.handleChange}
          aria-label="Vertical tabs"
          className={`${tabs} lightGrey blackFont flexContents`}
          orientation="vertical"
          indicatorColor="primary"
          variant="scrollable"
        >
          <Tab label="Senders" {...this.getTabProps(0)} />
          <Tab label="Receivers" {...this.getTabProps(1)} />
        </Tabs>
      </>
    );
  }
}
VerticalTabs.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  classes: PropTypes.shape({
    tabs: PropTypes.string
  }).isRequired
};
