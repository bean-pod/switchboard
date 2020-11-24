import React from "react";
import { Box, Typography } from "@material-ui/core";

export default class TabPanelH extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        role="tabpanel"
        hidden={this.props.value !== this.props.index}
        id={`full-width-tabpanel-${this.props.index}`}
        aria-labelledby={`full-width-tab-${this.props.index}`}
      >
        {this.props.value === this.props.index && (
          <Box p={0}>{this.props.children}</Box>
        )}
      </div>
    );
  }
}
