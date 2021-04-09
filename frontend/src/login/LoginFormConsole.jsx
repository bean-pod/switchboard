import React from "react";
import PropTypes from "prop-types";
import FormConsole from "../general/userForm/FormConsole";

export default function LoginConsole(props) {
  const { handleSubmit } = props;

  return <FormConsole handleSubmit={handleSubmit} buttonName="Login" />;
}

LoginConsole.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};
