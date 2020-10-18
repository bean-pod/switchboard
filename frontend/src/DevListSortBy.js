import { Select, Typography, MenuItem } from '@material-ui/core';
import React from 'react';

export default class DLSortBy extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <div flex-grow="1" class="sortBy">
                    <Typography  variant="caption" >Sort By</Typography>
                    <Select class="without-padding">
                        <MenuItem dense="true" value={"Online"}> <Typography variant="caption">Online</Typography></MenuItem>
                        <MenuItem dense="true" value={"Pending"}> <Typography variant="caption">Pending</Typography></MenuItem>
                        <MenuItem dense="true" value={"Error"}>   <Typography variant="caption">Error</Typography></MenuItem>
                        <MenuItem dense="true" value={"Offline"}> <Typography variant="caption">Offline</Typography></MenuItem>
                    </Select>
                </div>
            </React.Fragment>
        );
    }
}