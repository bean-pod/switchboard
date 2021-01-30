import React from "react";
import {List} from "@material-ui/core";

import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import SelectDeviceTableRow from "./SelectDeviceTableRow";
import DeviceInfo from "../model/DeviceInfo";

export default class SelectDevicesTable extends React.Component {
    render() {
        const {dataSource, name, onChange} = this.props;
        return (
            <>
                <div className="subtitle">{name}</div>
                <SearchBar/>
                <div style={{maxHeight: "300px", overflow: "auto"}}>
                    <List>
                        {dataSource.map((device) => {
                            return (
                                <SelectDeviceTableRow
                                    deviceDetails={device}
                                    key={device.serialNumber}
                                    onChange={onChange}
                                />
                            );
                        })}
                    </List>
                </div>
            </>
        );
    }
}
SelectDevicesTable.propTypes = {
    name: PropTypes.string.isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.instanceOf(DeviceInfo)).isRequired,
    onChange: PropTypes.func.isRequired
};
