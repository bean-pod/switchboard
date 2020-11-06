import React from 'react';
import {
    List
} from "@material-ui/core";

import SearchBar from "../devicelist/SearchBar"
import SelectDeviceTableRow from './SelectDeviceTableRow';

export default class SelectDevicesTable extends React.Component {

    constructor(props) {
        super(props)
        this.name = props.name;
    }

    render() {
        var i = 0;
        return (
            <React.Fragment>
                    <div className="subtitle">
                        {this.name}
                    </div>
                    <SearchBar />
                <div style={{ maxHeight: "300px", overflow: 'auto' }}>
                    <List >
                        {this.props.dataSource.map((device) => {
                            return (
                            <SelectDeviceTableRow 
                                deviceIndex={i}
                                deviceDetails={device}
                                key={this.name + (i++)} 
                                onChange={this.props.onChange}/>)
                        }
                        )}
                    </List>
                </div>
            </React.Fragment>
        );
    }
}