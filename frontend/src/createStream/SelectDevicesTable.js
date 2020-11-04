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

        return (
            <React.Fragment>

                <div style={{ margin: '1em' }}>
                    <div className="subtitle">
                        {this.name}
                    </div>
                    <SearchBar />
                </div>
                <div style={{ maxHeight: 300, overflow: 'auto' }}>
                    <List >
                        {this.props.dataSource.map((device) => {
                            return (<SelectDeviceTableRow deviceDetails={device} />)
                        }
                        )}
                    </List>
                </div>
            </React.Fragment>
        );
    }
}