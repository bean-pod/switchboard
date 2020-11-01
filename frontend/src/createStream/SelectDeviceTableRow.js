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

var i=0;
export default class SelectDeviceTableRow extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            deviceName: "Device Name" + i++,
            channels:[402,609,420,300],
            open: false
        }
        this.thing = [1,2,3,4]
    }

    render() {
        return (
            <div>
                <ListItem button dense onClick={() => this.setState({ open: !this.state.open })}>
                    <ListItemText
                        primary={this.state.deviceName} dense
                    />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem  >
                            <ListItemText secondary="Select Channel" />
                            <Select >
                                {
                                    this.state.channels.map((channel)=>{
                                        return(
                                            <MenuItem dense="true" value={channel}> 
                                                <Typography variant="caption"> {channel}</Typography>
                                            </MenuItem>
                                        );
                                    })
                                }                                
                            </Select>
                        </ListItem>
                    </List>
                </Collapse>
            </div>
        );
    }
}