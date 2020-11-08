import React from 'react';


export default class StatusIndicator extends React.Component {

    constructor(props) {
        super(props);
    }
    getStatusStyle(status) {
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

    render() {
        return (
            <div class={this.getStatusStyle(this.props.status)}>
                {this.props.status}
            </div>
        );
    }

}