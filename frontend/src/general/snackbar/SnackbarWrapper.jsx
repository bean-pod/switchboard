import React from "react";
import { useHistory } from "react-router-dom";
import SnackbarMessage from "./SnackbarMessage";

export default function SnackbarWrapper() {
  const history = useHistory();

  return <SnackbarMessage history={history} />;
}
