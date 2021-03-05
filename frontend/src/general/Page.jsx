import React from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import DynamicBreadcrumb from "./DynamicBreadcrumb";
import Title from "./Title";
import HeaderBar from "./HeaderBar";

export default function Page(props) {
  const { authenticated, breadcrumbs, title, children } = props;
  return (
    <>
      <HeaderBar authenticated={authenticated} />
      <Container>
        <DynamicBreadcrumb breadcrumbs={breadcrumbs} />
        <Title title={title} />
        {children}
      </Container>
    </>
  );
}

Page.propTypes = {
  authenticated: PropTypes.func.isRequired,
  breadcrumbs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
