import React from 'react';
import {
    Box
} from "@material-ui/core"


import StreamButton from '../General/StreamButton';
import AddDeviceButton from '../General/AddDeviceButton';

export default class TitleBox extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Box className="flexContents headerArea">
                    <div className="title">My Devices</div>
                    <div className="alignRightFloat" spacing={2}>
                        <StreamButton/>
                        <AddDeviceButton/>
                    </div>
                </Box>
            </React.Fragment>
        );
    }
}