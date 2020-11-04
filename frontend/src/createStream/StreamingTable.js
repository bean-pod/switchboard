import React from 'react';
import {
    Grid
} from "@material-ui/core"


import SelectDevicesTable from "./SelectDevicesTable";
import StreamButton from "../General/StreamButton";

export default class StreamingTable extends React.Component{

    constructor(props){
        super(props)
        this.dataSource = props.dataSource;
    }

    render(){
        return(
            <React.Fragment>  
                     
                <Grid container spacing={2} alignContent={"center"} alignItems={"center"}  justify = {'center'}>
                    <Grid item xs = {3}>
                        <div class="streamingTable">
                        <SelectDevicesTable name="Sender Devices" dataSource={this.props.dataSource}/>
                        </div>     
                    </Grid>
                    <Grid item xs = {2} id="TableStartStreaming" justify = {'center'}alignContent={"center"} alignItems={"center"}display="flex">
                        <StreamButton/>
                    </Grid>
                    <Grid item xs = {3}>
                        <div class="streamingTable">
                        <SelectDevicesTable name="Receiver Devices" dataSource={this.props.dataSource}/>
                        </div>
                    </Grid>
                </Grid>
           
        </React.Fragment>
        );
        
    }
}