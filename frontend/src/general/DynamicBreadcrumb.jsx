import React from "react";
import {Box, Breadcrumbs, Link, Typography} from "@material-ui/core";
import PropTypes from "prop-types";

export default class DynamicBreadcrumb extends React.Component {
    render() {
        const {breadcrumbs} = this.props;
        let i = 0;
        return (
            <Box padding="2em 0em 0em 1em">
                <Breadcrumbs aria-label="breadcrumb" id="breadcrumbParent">
                    {breadcrumbs.map((crumb) => {
                        return (
                            <Link
                                color="inherit"
                                href={crumb[1]}
                                id={`breadcrumb${i}`}
                                key={`breadcrumb${i++}`}
                            >
                                <Typography color="textPrimary">{crumb[0]}</Typography>
                            </Link>
                        );
                    })}
                </Breadcrumbs>
            </Box>
        );
    }
}
DynamicBreadcrumb.propTypes = {
    breadcrumbs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};
