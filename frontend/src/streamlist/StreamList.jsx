import React from "react";
import { Box, Container } from "@material-ui/core";
import PropTypes from "prop-types";
import * as useStyles from "../DefaultMakeStylesTheme";
import StreamsTable from "./StreamsTable";

export default function StreamList(props) {
  const { dataSource } = props;
  return (
    <Container>
      <Box className="headerAreaUnderline">
        <div className="title">Current Streams</div>
      </Box>
      <StreamsTable classes={useStyles} dataSource={dataSource} />
    </Container>
  );
}
StreamList.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
