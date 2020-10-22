import React from 'react';
import {
    Menu,
    IconButton,
    MenuItem
} from "@material-ui/core"

import {
    MoreVert
} from '@material-ui/icons/';

export default function ActionMenu() {
    // will need updating to function with individual devices
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVert />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>View details</MenuItem>
                <MenuItem onClick={handleClose}>Start stream with this as receiver</MenuItem>
                <MenuItem onClick={handleClose}><span class="warningText">Delete</span></MenuItem>
            </Menu>
        </React.Fragment>
    );
}