import React from "react";
import { Box, Container } from "@material-ui/core";
import PropTypes from "prop-types";

import DynamicBreadcrumb from "../general/DynamicBreadcrumb";
import LogsTableWrapper from "./LogsTableWrapper";

export default function LogListPage(props) {
  const { logsDataSource } = props;
  return (
    <>
      <Container>
        <DynamicBreadcrumb
          breadcrumbs={[
            ["Home", "/"],
            ["Logs", "/Logs"]
          ]}
        />
        <Box className="areaUnderBreadcrumbs">
          <Box className="headerAreaUnderline">
            <div className="title">Logs</div>
          </Box>
          <LogsTableWrapper logsDataSource={logsDataSource} />
        </Box>
      </Container>
    </>
  );
}

LogListPage.propTypes = {
  logsDataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
