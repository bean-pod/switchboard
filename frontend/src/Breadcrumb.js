import React from 'react';
import {
    Box,
    Breadcrumbs,
    Typography,
    Link
} from "@material-ui/core"

export default class DynamicBreadcrumb extends React.Component {

    render() {
        return (
        <Box padding="2em 0em 0em 0em">
            <Breadcrumbs aria-label="breadcrumb">
                {this.props.breadcrumbs.map((crumb) => {
                    return (
                        <React.Fragment>
                                <Link color="inherit" href={"\ " + crumb} >
                                        <Typography color="textPrimary"> {crumb}</Typography>
                                </Link> 
                        </React.Fragment>
                    );
                })}
            </Breadcrumbs>
            </Box>
        );
    }
}