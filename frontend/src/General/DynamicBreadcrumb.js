import React from 'react';
import {
    Box,
    Breadcrumbs,
    Typography,
    Link
} from "@material-ui/core"

export default class DynamicBreadcrumb extends React.Component {

    render() {
        var i = 0;
        return (
            <Box padding="2em 0em 0em 1em">
                <Breadcrumbs aria-label="breadcrumb">
                    {this.props.breadcrumbs.map((crumb) => {
                        return (
                            <Link color="inherit" href={crumb[1]} key={"breadcrumb" + (i++)}>
                                <Typography color="textPrimary"> {crumb[0]}</Typography>
                            </Link>
                        );
                    })}
                </Breadcrumbs>
            </Box>
        );
    }
}