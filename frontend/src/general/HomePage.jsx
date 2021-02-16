import React from "react";
import { Container } from "@material-ui/core";
import DynamicBreadcrumb from "./DynamicBreadcrumb";

export default function HomePage() {
  return (
    <Container>
      <DynamicBreadcrumb
        breadcrumbs={[
          ["Home", ""],
          ["My Devices", "Devices"],
          ["Streaming", "Streaming"],
          ["Logs", "Logs"]
        ]}
      />
    </Container>
  );
}
