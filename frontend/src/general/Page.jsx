import React from "react";
import PropTypes from "prop-types";
import { Box, Container } from "@material-ui/core";
import DynamicBreadcrumb from "./DynamicBreadcrumb";
import Title from "./Title";
import HeaderBar from "./HeaderBar";

export default function Page(props) {
  const { breadcrumbs, title, buttonType, children } = props;
  return (
    <>
      <HeaderBar />
      <Container>
        <DynamicBreadcrumb breadcrumbs={breadcrumbs} />
        <Box className="areaUnderBreadcrumbs">
          <Title title={title} buttonType={buttonType} />
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
  buttonType: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
Page.defaultProps = {
  buttonType: undefined
};
