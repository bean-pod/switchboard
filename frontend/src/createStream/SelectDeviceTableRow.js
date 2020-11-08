import React from 'react'
import {
    Collapse,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select
} from "@material-ui/core";
import {
    ExpandLess,
    ExpandMore
} from '@material-ui/icons/';

export default class SelectDeviceTableRow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({ open: !this.state.open })
    }

    render() {
        return (
            <React.Fragment>
                <ListItem button dense onClick={this.onClick}>
                    <ListItemText
                        primary={this.props.deviceDetails.name}
                    />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit >
                    <List component="div" disablePadding style={{ width: "96%" }}>
                        <ListItem divider>
                            <ListItemText secondary="Select Channel" />
                            <Select
                                defaultValue=""
                                onChange={this.props.onChange}>
                                {
                                    this.props.deviceDetails.channels.map((channel) => {
                                        return (
                                            <MenuItem
                                                value={`${this.props.deviceIndex}_${this.props.deviceDetails.name}_${channel.id}`}
                                                key={`${this.props.deviceDetails.name}_${channel.id}`} >
                                                {channel.port}
                                            </MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </ListItem>
                    </List>
                </Collapse>
            </React.Fragment>
        );
    }
}