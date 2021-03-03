import React, { useState } from "react";
import { Box, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import * as AuthenticationApi from "../api/AuthenticationApi";
import LoginFailedDialog from "./LoginFailedDialog";
import LoginConsole from "./LoginConsole";

export default function LoginPage(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const history = useHistory();

  const handleSubmit = (username, password) => {
    const { handleLogin } = props;

    handleLogin();
    // AuthenticationApi.logIn({ username, password }).catch((error) => {
    //   setDialogMessage(error.message);
    //   setDialogOpen(true);
    // });
    history.push("/Home");
    history.go(0);
  };

  return (
    <Container>
      <Box className="flexContents headerAreaUnderline">
        <div className="title">Login</div>
      </Box>
      <LoginConsole handleSubmit={handleSubmit} />
      <LoginFailedDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        message={dialogMessage}
      />
    </Container>
  );
}
