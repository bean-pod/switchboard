import React from 'react';
import {
    Breadcrumbs,
    Typography,
    Link
} from "@material-ui/core"

export default class DynamicBreadcrumb extends React.Component {

    render() {
        return (
            <Breadcrumbs aria-label="breadcrumb">
                {this.props.breadcrumbs.map((crumb) => {
                    
                    if (crumb==="Home")
                     return (
                        <React.Fragment>
                            <Link color="inherit" href="" >
                                <Typography color="textPrimary"> {crumb}</Typography>
                            </Link>
                        </React.Fragment>
                    
                    );
                    return (
                        <React.Fragment>
                            <Link color="inherit" href={"\ " + crumb} > <Typography color="textPrimary"> {crumb}</Typography>
                    </Link>
                        </React.Fragment>
                    
                    );
                })}
            </Breadcrumbs>
        );
    }
}