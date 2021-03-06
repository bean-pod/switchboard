import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export default class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.component = this.component.bind(this);
  }

  component() {
    const { isAuthenticated, render } = this.props;
    if (isAuthenticated()) {
      return render();
    }
    return <Redirect to={{ pathname: "/login" }} />;
  }

  render() {
    const { path } = this.props;
    return <Route exact path={path} render={() => this.component()} />;
  }
}

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired
};
