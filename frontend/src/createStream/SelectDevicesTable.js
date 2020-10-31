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
        return [0, 1, 2].map((value) =>
          React.cloneElement(element, {
            key: value,}),
        );
    }

    render(){

        return (
            <React.Fragment>
                <Typography variant= "h5"> Devices</Typography>
                <SearchBar />
                <List dense="true">
                {this.generate(
                    <ListItem button>
                    <ListItemText
                        primary="NAME"
                    />
                    </ListItem>,
                )}
                </List>
            </React.Fragment>
        );
    }
}