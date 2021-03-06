import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export default class UnprotectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.component = this.component.bind(this);
  }

  component() {
    const { isAuthenticated, render } = this.props;
    if (isAuthenticated()) {
      return <Redirect to={{ pathname: "/Home" }} />;
    }
    return render();
  }

  render() {
    const { path } = this.props;
    return <Route exact path={path} render={() => this.component()} />;
  }
}

UnprotectedRoute.propTypes = {
  isAuthenticated: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired
};
