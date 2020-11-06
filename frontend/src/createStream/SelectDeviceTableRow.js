import React from 'react'
import {
    Collapse,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import {
    ExpandLess,
    ExpandMore
} from '@material-ui/icons/';

export default class SelectDeviceTableRow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            deviceName: props.deviceDetails.name,
            channels: props.deviceDetails.channels,
            open: false
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.setState({ open: !this.state.open })
    }

    render() {
        return (
            <React.Fragment>
                <ListItem button dense onClick={this.onClick}>
                    <ListItemText
                        primary={this.state.deviceName}
                    />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit >
                    <List component="div" disablePadding>
                        <ListItem divider>
                            <ListItemText secondary="Select Channel" />
                            <Select
                                defaultValue=""
                                onChange={this.props.onChange}>
                                {
                                    this.state.channels.map((channel) => {
                                        return (
                                            <MenuItem 
                                            value={this.props.deviceIndex+"_"+ this.state.deviceName + "_" + channel.port} 
                                            key={this.state.deviceName + "_" + channel.port}>
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