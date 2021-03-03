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
          <Tab
            label="Senders"
            id="vertical-tab-0"
            aria-controls="vertical-tabpanel-0"
          />
          <Tab
            label="Receivers"
            id="vertical-tab-1"
            aria-controls="vertical-tabpanel-1"
          />
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
