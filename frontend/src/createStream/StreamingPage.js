import React from 'react';
import {
    Box,
    Container
} from "@material-ui/core"
import StreamingTable from "./StreamingTable"

export default class StreamTable extends React.Component{
    
    render(){
        return (
            <React.Fragment>
                <Container>
                    <Box class="flexContents headerArea"> 
                        <div class="title">Streaming</div>
                    </Box>
                    <StreamingTable />
                </Container>
            </React.Fragment>
            
        );
    }
}