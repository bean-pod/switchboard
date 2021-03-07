import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

import { isAuthenticated } from "../api/AuthenticationApi";

export default class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.component = this.component.bind(this);
  }

  component() {
    const { isUserPage, render } = this.props;
    const authenticated = isAuthenticated();
    let redirectPath = "";

    if (authenticated && isUserPage) {
      return render();
    }

    if (isUserPage) redirectPath = "/Login";
    else {
      redirectPath = "/Home";
    }

    return <Redirect to={{ pathname: redirectPath }} />;
  }

  render() {
    const { path } = this.props;
    return <Route exact path={path} render={() => this.component()} />;
  }
}

ProtectedRoute.propTypes = {
  isUserPage: PropTypes.bool,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired
};

ProtectedRoute.defaultProps={
  isUserPage: false
}
