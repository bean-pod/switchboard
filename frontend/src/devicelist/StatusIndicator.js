import React from 'react';

function getStatusStyle(status) {
    switch (status) {
        case "Online":
            return "green statusText";
        case "Pending":
            return "yellow statusText";
        case "Error":
            return "red statusText";
        default:
            return "lightGrey statusOfflineText";
    }
}

export default function StatusIndicator(props) {
    return (
        <div class={getStatusStyle(props.row.status)}>
            {props.row.status}
        </div>
    );
}