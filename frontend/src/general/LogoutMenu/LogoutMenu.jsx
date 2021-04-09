import React from "react";
import PropTypes from "prop-types";
import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography
} from "@material-ui/core";
import { NavLink } from "react-router-dom";

export default function LogoutMenu(props) {
  const { anchor, open, handleClose, handleLogout } = props;

  return (
    <Popper open={open} anchorEl={anchor} transition disablePortal>
      <Grow in={open} style={{ transformOrigin: "center top" }}>
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id="menu-list-grow">
              <MenuItem disabled>
                <Typography color="textSecondary">Quick Actions</Typography>
              </MenuItem>
              <NavLink to="/Home" className="hideLinkStyle">
                <MenuItem>
                  <Typography color="textPrimary">Dashboard</Typography>
                </MenuItem>
              </NavLink>
              <NavLink to="/Devices" className="hideLinkStyle">
                <MenuItem>
                  <Typography color="textPrimary">My Devices</Typography>
                </MenuItem>
              </NavLink>
              <MenuItem onClick={handleLogout}>
                <Typography color="error">Logout</Typography>
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Grow>
    </Popper>
  );
}

LogoutMenu.propTypes = {
  anchor: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};
