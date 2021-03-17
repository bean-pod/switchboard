import React from "react";
import PropTypes from "prop-types";
import { Box, Container } from "@material-ui/core";
import DynamicBreadcrumb from "./DynamicBreadcrumb";
import Title from "./Title";
import HeaderBar from "./HeaderBar";

export default function Page(props) {
  const { breadcrumbs, title, deviceList, children } = props;
  return (
    <>
      <HeaderBar />
      <Container>
        <DynamicBreadcrumb breadcrumbs={breadcrumbs} />
        <Box className="areaUnderBreadcrumbs">
          <Title title={title} deviceList={deviceList} />
          {children}
        </Box>
      </Container>
    </>
  );
}

Page.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
  title: PropTypes.string.isRequired,
  deviceList: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
Page.defaultProps = {
  deviceList: false
};
