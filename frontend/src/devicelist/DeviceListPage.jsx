import React from "react";
import { Box, Container } from "@material-ui/core";

import PropTypes from "prop-types";
import TitleBox from "./TitleBox";
import ContentsTable from "./ContentsTable";
import DynamicBreadcrumb from "../general/DynamicBreadcrumb";
import * as useStyles from "../DefaultMakeStylesTheme";
import Page from "../general/Page";

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
