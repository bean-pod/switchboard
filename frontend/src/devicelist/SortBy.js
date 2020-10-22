import { Select, Typography, MenuItem } from '@material-ui/core';
import React from 'react';

export default class DLSortBy extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <div flex-grow="1">
                    <Typography class="sortBy" variant="caption" >Sort By</Typography>
                    <Select variant= "outlined" id="sortBySelect">
                        <MenuItem dense="true" value={"Name"}> <Typography variant="caption">Name</Typography></MenuItem>
                        <MenuItem dense="true" value={"Last Access"}>   <Typography variant="caption">Last Access</Typography></MenuItem>
                        <MenuItem dense="true" value={"Offline"}> <Typography variant="caption">Offline</Typography></MenuItem>
                    </Select>
                </div>
            </React.Fragment>
        );
    }
}