import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import Page from "../general/Page";
import LoginPageContents from "./LoginPageContents";

export default function LoginPage(props) {
  const history = useHistory();
  const { authenticated, handleLogout, handleLogin } = props;

  return (
    <Page
      authenticated={authenticated}
      handleLogout={handleLogout}
      title="Login"
      breadcrumbs={[]}
    >
      <LoginPageContents history={history} handleLogin={handleLogin} />
    </Page>
  );
}

LoginPage.propTypes = {
  authenticated: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
};
