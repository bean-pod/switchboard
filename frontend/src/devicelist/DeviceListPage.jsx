import React from "react";
import { Box, Container } from "@material-ui/core";

import PropTypes from "prop-types";
import TitleBox from "./TitleBox";
import ContentsTable from "./ContentsTable";
import DynamicBreadcrumb from "../general/DynamicBreadcrumb";
import * as useStyles from "../DefaultMakeStylesTheme";

export default function DeviceListPage(props) {
  const { dataSource } = props;
  return (
    <Container>
      <DynamicBreadcrumb
        breadcrumbs={[
          ["Home", "/"],
          ["My Devices", "Devices"]
        ]}
      />
      <Box className="areaUnderBreadcrumbs">
        <TitleBox />
        <ContentsTable classes={useStyles} dataSource={dataSource} />
      </Box>
    </Container>
  );
}

DeviceListPage.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
