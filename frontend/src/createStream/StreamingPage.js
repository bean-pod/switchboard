import React from 'react';
import {
    Box,
    Container
} from "@material-ui/core"
import StreamingTable from "./StreamingTable"

import DynamicBreadcrumb from '../Breadcrumb';

export default class StreamTable extends React.Component{
    
    render(){
        return (
            <Container>

                <DynamicBreadcrumb breadcrumbs={["Home", "Stream"]}/>

                <Box padding="1em">
                    <Box class="flexContents headerArea"> 
                        <div class="title">Streaming</div>
                    </Box>
                    <StreamingTable />
                </Box>
                    
            </Container>
            
        );
    }
}