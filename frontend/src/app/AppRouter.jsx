import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Switch } from "react-router-dom";

export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleLogin, handleLogout, authenticated, admin } = this.props;
    return (
    <BrowserRouter>
    <Switch>
        
    </Switch>
    </BrowserRouter>) ;
  }
}

AppRouter.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  admin: PropTypes.bool.isRequired
};
