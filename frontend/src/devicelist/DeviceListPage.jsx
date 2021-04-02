import React from "react";

import Page from "../general/Page";
import DeviceListPageContents from "./DeviceListPageContents";

export default function DeviceListPage() {
  const breadcrumb = [
    ["Home", "/Home"],
    ["My Devices", "/Devices"]
  ];
  return (
    <Page title="My Devices" breadcrumbs={breadcrumb} deviceList>
      <DeviceListPageContents />
    </Page>
  );
}
