import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { isAdmin } from "../api/AuthenticationApi";

export default class AdminProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.component = this.component.bind(this);
  }

  component() {
    const { render, path } = this.props;
    if (isAdmin()) {
      return <ProtectedRoute path={path} isUserPage render={render} />;
    }
    return <Redirect to={{ pathname: "/InvalidPath" }} />;
  }

  render() {
    const { path } = this.props;
    return <Route exact path={path} render={() => this.component()} />;
  }
}

AdminProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired
};
