import React from "react";
import { Box, Container } from "@material-ui/core";
import PropTypes from "prop-types";
import StreamsTablePopulator from "./StreamsTablePopulator";

export default function StreamListPage(props) {
  const { dataSource } = props;
  return (
    <>
      <Container>
        <Box className="headerAreaUnderline">
          <div className="title">Current Streams</div>
        </Box>
        <StreamsTablePopulator dataSource={dataSource} />
      </Container>
    </>
  );
}
StreamListPage.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
