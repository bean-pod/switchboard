import React from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import DynamicBreadcrumb from "./DynamicBreadcrumb";
import Title from "./Title";
import HeaderBar from "./HeaderBar";
import DeviceInfo from "../model/DeviceInfo";
import StreamInfo from "../model/StreamInfo";

export default function Page(props) {
  const { breadcrumbs, title, hasStreamButton, children } = props;
  return (
    <>
      <HeaderBar />
      <Container>
        <DynamicBreadcrumb breadcrumbs={breadcrumbs} />
        <Title title={title} hasStreamButton={hasStreamButton} />
        {children}
      </Container>
    </>
  );
}

Page.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.objectOf(
          PropTypes.oneOfType([
            PropTypes.instanceOf(DeviceInfo),
            PropTypes.instanceOf(StreamInfo)
          ])
        )
      ])
    )
  ).isRequired,
  title: PropTypes.string.isRequired,
  hasStreamButton: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
Page.defaultProps = {
  hasStreamButton: false
};
