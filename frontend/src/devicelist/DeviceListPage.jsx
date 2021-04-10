import React from "react";
import PropTypes from "prop-types";

import Page from "../general/Page";
import DeviceListPageContents from "./DeviceListPageContents";

export default function DeviceListPage(props) {
  const {
    location: { state: selected }
  } = props;

  const breadcrumb = [
    ["Home", "/Home"],
    ["My Devices", "/Devices"]
  ];
  return (
    <Page title="My Devices" breadcrumbs={breadcrumb} hasStreamButton>
      <DeviceListPageContents selectedState={selected} />
    </Page>
  );
}

DeviceListPage.defaultProps = {
  location: { state: { selected: 0 } }
};

DeviceListPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      selected: PropTypes.number
    })
  })
};
