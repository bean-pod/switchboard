import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Typography
} from "@material-ui/core";

import SearchBar from "../devicelist/SearchBar"

export default class SelectDevicesTable extends React.Component{

    
    generate(element) {
        var arr = [0,0,0,0,0,0,0,0,0,0];
        return arr.map((value) =>
          React.cloneElement(element, {
            key: value,}),
        );
    }

    render(){

        return (
            <React.Fragment>
                <Typography variant= "h5"> Devices</Typography>
                <SearchBar />
                <div style={{maxHeight: 200, overflow: 'auto'}}>
                    <List >
                        {this.generate(
                            <ListItem button dense>
                            <ListItemText
                                primary="Device Name" dense
                            />
                            </ListItem>,
                        )}
                    </List>
                </div>
                
                
            </React.Fragment>
        );
    }
}