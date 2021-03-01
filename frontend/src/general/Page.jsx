import React from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import DynamicBreadcrumb from "./DynamicBreadcrumb";
import Title from "./Title";

export default function Page(props) {
  const { breadcrumbs, title, children } = props;
  return (
    <Container>
      <DynamicBreadcrumb breadcrumbs={breadcrumbs} />
      <Title title={title} />
      {children}
    </Container>
  );
}

Page.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
