import React from 'react';
import {
    Button,
    Grid
} from "@material-ui/core"

import {
    SwapHoriz
} from '@material-ui/icons/';

import SelectDevicesTable from "./SelectDevicesTable";

export default class StreamingTable extends React.Component{

    render(){
        return(
            <React.Fragment>            
                <Grid container spacing={2} alignContent={"center"} alignItems={"center"}  justify = {'center'}>
                    <Grid item xs = {4}>
                        <SelectDevicesTable/>
                    </Grid>
                    <Grid item xs = {3} justify = {'center'}>
                        <Button class="green buttonText">
                            <SwapHoriz /> Stream
                        </Button>
                    </Grid>
                    <Grid item xs = {4}>
                    <SelectDevicesTable/>
                    </Grid>
                </Grid>
           
        </React.Fragment>
        );
        
    }
}