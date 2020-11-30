import React from "react";
import PropTypes from "prop-types";

export default class StatusIndicator extends React.Component {
  getStatusStyle(status) {
    switch (status) {
      case "Online":
        return "green statusIndicatorBody statusTextOnline ";
      case "Pending":
        return "yellow statusIndicatorBody statusTextOnline";
      case "Error":
        return "red statusIndicatorBody statusTextOnline";
      default:
        return "lightGrey statusIndicatorBody statusTextOffline";
    }
  }

  render() {
    const { status } = this.props;
    return <div className={this.getStatusStyle(status)}>{status}</div>;
  }
}
StatusIndicator.propTypes = {
  status: PropTypes.oneOf(["Online", "Offline", "Error", "Pending"]).isRequired
};
