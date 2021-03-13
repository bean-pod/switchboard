import React, { useState } from "react";
import { Button, Container, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import { useStyles } from "../../login/LoginConsole"

export default function CreateUserConsole(props) {
  const { handleSubmit } = props;
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(username, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            autoComplete="username"
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={password.length < 5 && password.length > 0}
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            inputProps={{ maxLength: 20, minLength: 5 }}
            helperText="Password must be between 5 to 20 characters"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}

CreateUserConsole.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};
