import React from "react";
import PropTypes from "prop-types";

import Page from "../general/Page";
import DeviceListTabTable from "./ContentsTable";
import * as useStyles from "../DefaultMakeStylesTheme";

export default function DeviceListPage(props) {
  const { dataSource } = props;
  const breadcrumb = [
    ["Home", "/Home"],
    ["My Devices", "/Devices"]
  ];
  return (
    <Page title="My Devices" breadcrumbs={breadcrumb} deviceList>
      <DeviceListTabTable classes={useStyles} dataSource={dataSource} />
    </Page>
  );
}

DeviceListPage.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
