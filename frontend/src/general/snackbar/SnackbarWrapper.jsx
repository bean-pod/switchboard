import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import SnackbarMessage from "./SnackbarMessage";

export default function SnackbarWrapper() {
  const history = useHistory();
  const location = useLocation();

  return <SnackbarMessage history={history} location={location} />;
}
