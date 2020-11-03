import React from 'react';
import {
    Container
} from "@material-ui/core"
import DynamicBreadcrumb from "../Breadcrumb";
export default class HomePage extends React.Component{
    render(){
        return(
            <Container>
                <DynamicBreadcrumb breadcrumbs={["Devices", "Streaming"]}/>
            </Container>
        );
    }
}