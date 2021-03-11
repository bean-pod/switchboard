import React from "react";

import Page from "../general/Page";
import DeviceListTabTable from "./DeviceListTabTable";
import * as useStyles from "../DefaultMakeStylesTheme";
import * as dataSource from "../api/DeviceApi";

export default function DeviceListPage() {
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
