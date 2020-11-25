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
    return (
      <div className={this.getStatusStyle(this.props.status)}>
        {this.props.status}
      </div>
    );
  }
}
StatusIndicator.propTypes = {
  status: PropTypes.string.isRequired
};
