import React from "react";
import PropTypes from "prop-types";

import FormConsole from "../../general/userForm/FormConsole";

export default function CreateUserFormConsole(props) {
  const { handleSubmit } = props;

  return (
    <>
      <FormConsole
        handleSubmit={handleSubmit}
        buttonName="Create"
        isValidate
        passwordError={{ upperbound: 5, lowerbound: 0 }}
        passwordInputProps={{ maxLength: 20, minLength: 5 }}
        passwordHelperText="Password must be between 5 to 20 characters"
      />
    </>
  );
}

CreateUserFormConsole.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};
