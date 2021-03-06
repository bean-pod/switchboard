import React from "react";
import { useHistory } from "react-router-dom";

import Page from "../general/Page";
import LoginPageContents from "./LoginPageContents";

export default function LoginPage() {
  const history = useHistory();
  return (
    <Page title="Login" breadcrumbs={[]} login>
      <LoginPageContents history={history} />
    </Page>
  );
}
