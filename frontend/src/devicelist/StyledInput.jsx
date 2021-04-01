import React from "react";
import { InputBase, withStyles } from "@material-ui/core";

export default withStyles({
  input: {
    borderRadius: 4,
    position: "relative",
    fontWeight: 500,
    letterSpacing: "0.0075em",
    lineHeight: "1.6",
    fontSize: "1.25rem",
    padding: "10px 26px 10px 12px",
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
})(InputBase);
