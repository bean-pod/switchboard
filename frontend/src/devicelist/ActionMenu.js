import React from 'react';
import {
    Menu,
    IconButton,
    MenuItem
} from "@material-ui/core"

import {
    MoreVert
} from '@material-ui/icons/';

export default class ActionMenu extends React.Component {
    constructor() {
        super()
        this.state = {
            anchorElement: null
        }

        this.setAnchorElement = this.setAnchorElement.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    setAnchorElement(element) {
        this.setState({
            anchorElement: element
        })
    }

    handleClick(event) {
        this.setAnchorElement(event.currentTarget)
    }

    handleClose() {
        this.setAnchorElement(null)
    }

    render() {
        return (
            <React.Fragment>
                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                    <MoreVert />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorElement}
                    keepMounted
                    open={Boolean(this.state.anchorElement)}
                    onClose={this.handleClose}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    transformOrigin={{ horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem onClick={this.handleClose}>View details</MenuItem>
                    <MenuItem onClick={this.handleClose}>Start stream with this as receiver</MenuItem>
                    <MenuItem onClick={this.handleClose}><span class="warningText">Delete</span></MenuItem>
                </Menu>
            </React.Fragment>
        );
    }
}