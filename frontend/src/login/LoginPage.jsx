import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  makeStyles,
  Snackbar,
  TextField
} from "@material-ui/core";
import DynamicBreadcrumb from "../general/DynamicBreadcrumb";
import * as AuthenticationApi from "../api/AuthenticationApi";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function LogIn() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const open = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    AuthenticationApi.logIn({ username, password }).catch((error) => {
      if(error.response && error.response.status === "403") {
        // Incorrect credentials popup
      } else {
        // Unknown error occurred
      }
    });
  };

  return (
    <Container>
      <DynamicBreadcrumb
        breadcrumbs={[
          ["Home", "/"],
          ["Login", "Login"]
        ]}
      />
      <Box className="areaUnderBreadcrumbs">
        <Box className="flexContents headerAreaUnderline">
          <div className="title">Welcome to Switchboard</div>
        </Box>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
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
                Log In
              </Button>
            </form>
          </div>
        </Container>
      </Box>
    </Container>
  );
}
