import React, { useState } from "react";
import {
  Box,
  Container
} from "@material-ui/core";
import * as AuthenticationApi from "../api/AuthenticationApi";
import LoginFailedDialog from "./LoginFailedDialog";
import LoginConsole from "./LoginConsole";

export default function LoginPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleSubmit = (username, password) => {
    AuthenticationApi.logIn({ username, password }).catch((error) => {
      if (error.response && error.response.status === "403") {
        setDialogMessage("Incorrect username and/or password. Please enter the correct credentials and try again.");
        setDialogOpen(true);
      } else {
        setDialogMessage("An unknown error occurred. Please try again later.");
        setDialogOpen(true);
      }
    });
  };

  return (
    <Container>
      <Box className="flexContents headerAreaUnderline">
        <div className="title">Welcome to Switchboard</div>
      </Box>
      <LoginConsole handleSubmit={handleSubmit}/>
      <LoginFailedDialog open={dialogOpen} setOpen={setDialogOpen} message={dialogMessage}/>
    </Container>
  );
}
