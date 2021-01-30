import React from "react";
import PropTypes from "prop-types";
import {Box} from "@material-ui/core";

export default function HorizontalTabPanel(props) {
    const {value, index, children} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
        >
            {value === index && <Box p={0}>{children}</Box>}
        </div>
    );
}

HorizontalTabPanel.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};
