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

    if (isUserPage) {
      if (authenticated) {
        return render();
      }

      return <Redirect to={{ pathname: "/Login" }} />;
    }

    if (authenticated) {
      return <Redirect to={{ pathname: "/Home" }} />;
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
