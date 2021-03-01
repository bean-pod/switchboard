import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export default class AdminProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.component = this.component.bind(this);
  }

  component() {
    const { admin, authenticated, render } = this.props;
    if (admin) {
      return <ProtectedRoute authenticated={authenticated} render={render}/>
    }
    return <Redirect to={{ pathname: "/login" }} />;
  }

  render() {
    const { path } = this.props;
    return <Route exact path={path} render={() => this.component()} />;
  }
}

AdminProtectedRoute.propTypes = {
    admin: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    render:PropTypes.func.isRequired
}
