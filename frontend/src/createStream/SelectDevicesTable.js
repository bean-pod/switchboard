import React from 'react';
import {
    List,
    Typography
} from "@material-ui/core";
import SearchBar from "../devicelist/SearchBar"
import SelectDeviceTableRow from './SelectDeviceTableRow';

export default class SelectDevicesTable extends React.Component{

    constructor(props){
        super(props)
    }

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
                <div style={{margin:'1em'}}>
                    <SearchBar />
                </div>
                <div style={{maxHeight: 300, overflow: 'auto'}}>
                    <List >
                        {this.generate(
                            <SelectDeviceTableRow/>,
                        )}
                    </List>
                </div>
            </React.Fragment>
        );
    }
}