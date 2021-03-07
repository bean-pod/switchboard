import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

import { isAuthenticated } from "../api/AuthenticationApi";

export default class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.component = this.component.bind(this);
  }

  redirect(redirectPath) {
    return <Redirect to={{ pathname: redirectPath }} />;
  }

  component() {
    const { isUserPage, render } = this.props;
    const authenticated = isAuthenticated();

    if (isUserPage) {
      if (authenticated) {
        return render();
      }

      return redirect("/Login");
    }

    if (authenticated) {
      return redirect("/Home");
    }

    return render();
  }

  render() {
    const { path } = this.props;
    return <Route exact path={path} render={() => this.component()} />;
  }
}

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  isUserPage: PropTypes.bool,
  render: PropTypes.func.isRequired
};

ProtectedRoute.defaultProps = {
  isUserPage: false
};
