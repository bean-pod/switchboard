import React from "react";
import PropTypes from "prop-types";

import Page from "../general/Page";
import ContentsTable from "./ContentsTable";
import * as useStyles from "../DefaultMakeStylesTheme";

export default function DeviceListPage(props) {
  const { dataSource } = props;
  const breadcrumb = [
    ["Home", "/"],
    ["My Devices", "Devices"]
  ];
  return (
    <Page title="My Devices" breadcrumbs={breadcrumb} deviceList>
      <ContentsTable classes={useStyles} dataSource={dataSource} />
    </Page>
  );
}

DeviceListPage.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
