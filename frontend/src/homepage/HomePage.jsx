import React from "react";
import {
  Container,
} from "@material-ui/core";
import DynamicBreadcrumb from "../general/DynamicBreadcrumb";

export default function HomePage() {
  return (
    <Container>
      <DynamicBreadcrumb breadcrumbs={[["Home", ""]]} />
    </Container>
  );
}
