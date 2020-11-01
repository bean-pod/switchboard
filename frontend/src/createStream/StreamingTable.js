import React from 'react';
import {
    Button,
    Grid
} from "@material-ui/core"

import {
    SwapHoriz
} from '@material-ui/icons/';

import SelectDevicesTable from "./SelectDevicesTable";
import StreamButton from "../General/StreamButton";

export default class StreamingTable extends React.Component{

    render(){
        return(
            <React.Fragment>  
                     
                <Grid container spacing={2} alignContent={"center"} alignItems={"center"}  justify = {'center'}>
                    <Grid item xs = {2}>
                        <div class="streamingTable">
                        <SelectDevicesTable/>
                        </div>     
                    </Grid>
                    <Grid item xs = {2} id="TableStartStreaming" justify = {'center'}alignContent={"center"} alignItems={"center"}display="flex">
                        <StreamButton/>
                    </Grid>
                    <Grid item xs = {2}>
                        <div class="streamingTable">
                        <SelectDevicesTable/>
                        </div>
                    </Grid>
                </Grid>
           
        </React.Fragment>
        );
        
    }
}