import React from 'react';
import {
    Box
} from "@material-ui/core"
import { NavLink } from 'react-router-dom';


import StreamButton from '../General/Buttons/StreamButton';
import AddDeviceButton from '../General/Buttons/AddDeviceButton';

export default class TitleBox extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Box className="flexContents headerArea">
                    <div className="title">My Devices</div>
                    <div className="alignRightFloat" spacing={2}>
                        <NavLink
                            to="/Streaming"
                            activeClassName="hideLinkStyle"
                            className="hideLinkStyle"
                            exact>
                            <StreamButton id="DeviceListStreamBtn" />
                        </NavLink>
                        <AddDeviceButton id="DeviceListAddDevBtn" />
                    </div>
                </Box>
            </React.Fragment>
        );
    }
}