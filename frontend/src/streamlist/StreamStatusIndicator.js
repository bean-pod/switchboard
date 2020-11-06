import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import WarningIcon from '@material-ui/icons/Warning'
import BlockIcon from '@material-ui/icons/Block'

function getStatusIcon(status) {
    switch(status){
        case "Online":
            return (
                <CheckCircleOutlineIcon class="greenFill" />
            );
        case "Error":
            return (
                <WarningIcon class="yellowFill" />
            );
        default: 
            return (
                <BlockIcon class="redFill" />
            );
    }
}

export default function StatusIndicator(props) {
    return (
        <div>
            {getStatusIcon(props.row.status)}
        </div>
    );
}