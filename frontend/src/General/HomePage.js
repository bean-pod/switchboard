import React from 'react';
import {
    Container
} from "@material-ui/core"
import DynamicBreadcrumb from "./DynamicBreadcrumb";
export default class HomePage extends React.Component{
    render(){
        return(
            <Container>
            <DynamicBreadcrumb
                breadcrumbs={[["Home", ""], 
                        ["My Devices", "Devices"], 
                        ["Streaming", "Streaming"]]} />
            </Container>
        );
    }
}