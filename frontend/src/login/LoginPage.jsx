import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import Page from "../general/Page";
import LoginPageContents from "./LoginPageContents";

export default function LoginPage() {
  const history = useHistory();

  return (
    <Page title="Login" breadcrumbs={[]}>
      <LoginPageContents history={history} />
    </Page>
  );
}
