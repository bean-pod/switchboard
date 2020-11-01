import React from 'react';

function getStatusStyle(status) {
    switch (status) {
        case 0:
            return "green statusText";
        case 1:
            return "yellow statusText";
        case 2:
            return "red statusText";
        default:
            return "lightGrey statusOfflineText";
    }
}

function getStatusText(status) {
    switch (status) {
        case 0:
            return "Online";
        case 1:
            return "Pending";
        case 2:
            return "Error";
        default:
            return "Offline";
    }
}

export default function StatusIndicator(props) {
    return (
        <div class={getStatusStyle(props.row.status)}>
            {getStatusText(props.row.status)}
        </div>
    );
}