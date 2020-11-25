import React from "react";
import PropTypes from "prop-types";

export default class StatusIndicator extends React.Component {
  getStatusStyle(status) {
    switch (status) {
      case "Online":
        return "green statusText";
      case "Pending":
        return "yellow statusText";
      case "Error":
        return "red statusText";
      default:
        return "lightGrey statusOfflineText";
    }
  }

  render() {
    const { status } = this.props;
    return <div className={this.getStatusStyle(status)}>{status}</div>;
  }
}
StatusIndicator.propTypes = {
  status: PropTypes.string.isRequired
};
