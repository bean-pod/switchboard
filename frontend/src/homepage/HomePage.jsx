import React from "react";
import Page from "../general/Page";
import HomePageContents from "./HomePageContents";

export default function HomePage() {
  return (
    <Page title="Dashboard" breadcrumbs={[["Home", ""]]}>
      <HomePageContents />
    </Page>
  );
}
