import React from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import DynamicBreadcrumb from "./DynamicBreadcrumb";
import Title from "./Title";
import HeaderBar from "./HeaderBar";
import DeviceInfo from "../model/DeviceInfo";
import StreamInfo from "../model/StreamInfo";

export default function Page(props) {
  const { breadcrumbs, title, deviceList, children } = props;
  return (
    <>
      <HeaderBar />
      <Container>
        <DynamicBreadcrumb breadcrumbs={breadcrumbs} />
        <Title title={title} deviceList={deviceList} />
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
  deviceList: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
Page.defaultProps = {
  deviceList: false
};
