import React from "react";
import PropTypes from "prop-types";
import {IconButton} from "@material-ui/core";
import {Pause, Sync} from "@material-ui/icons";

import DeleteStream from "./DeleteStream";

export default function ActionButtons(props) {
    const {streamId} = props;
    return (
        <>
            <div align="center">
                <IconButton>
                    <Sync/>
                </IconButton>
                <IconButton>
                    <Pause/>
                </IconButton>
                <DeleteStream deleteId={streamId}/>
            </div>
        </>
    );
}

ActionButtons.propTypes = {
    streamId: PropTypes.objectOf(PropTypes.string).isRequired
};
