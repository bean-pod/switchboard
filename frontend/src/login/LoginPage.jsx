import React from "react";
import Page from "../general/Page";
import LoginPageContents from "./LoginPageContents";

export default function LoginPage() {
  return (
    <Page title="Login" breadcrumbs={[]}>
      <LoginPageContents />
    </Page>
  );
}
