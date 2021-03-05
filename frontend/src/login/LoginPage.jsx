import React from "react";
import Page from "../general/Page";
import LoginPageContents from "./LoginPageContents";

export default function LoginPage(props) {
  return (
    <Page title="Login" breadcrumbs={[]} login>
      <LoginPageContents />
    </Page>
  );
}
