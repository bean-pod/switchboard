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
                <Box class="flexContents headerArea">
                    <div class="title">My Devices</div>
                    <div class="alignRightFloat" spacing={2}>
                        <StreamButton/>
                        <AddDeviceButton/>
                    </div>
                </Box>
            </React.Fragment>
        );
    }
}