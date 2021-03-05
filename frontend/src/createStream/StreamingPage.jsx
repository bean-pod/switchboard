import React from "react";
import { Box, Container } from "@material-ui/core";
import PropTypes from "prop-types";
import StreamingTable from "./StreamingTable";
import DynamicBreadcrumb from "../general/DynamicBreadcrumb";

export default class StreamingPage extends React.Component {
  constructor(props) {
    super(props);
    this.dataSource = props.deviceDataSource;
  }

  render() {
    const { deviceDataSource } = this.props;
    return (
      <Container>
        <DynamicBreadcrumb
          breadcrumbs={[
            ["Home", "/"],
            ["My Devices", "Devices"],
            ["Streaming", "Streaming"]
          ]}
        />
        <Box className="areaUnderBreadcrumbs">
          <Box className="flexContents headerAreaUnderline">
            <div className="title">Streaming</div>
          </Box>
          <div id="StreamingTable">
            <StreamingTable dataSource={deviceDataSource} />
          </div>
        </Box>
      </Container>
    );
  }
}
StreamingPage.propTypes = {
  deviceDataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
