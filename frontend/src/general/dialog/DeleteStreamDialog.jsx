import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import Dialog from "./Dialog"

export default class DeleteStreamDialog extends React.Component {
    constructor(props) {
        super(props);
        state = {
            open: false
        }
        this.dialogElement = React.useRef();
    }

    confirmDelete() {
        const history = useHistory();
        StreamApi.deleteStream(this.deleteId, () => {
            history.push("/Streaming");
            history.go(0);
        });
        return this.dialogElement.current.closeDialog();
    }

    render() {

        const { deleteId } = this.props;
        const message = `Are you sure you want to end stream ${deleteId}?`;

        return (
            <Dialog ref={this.dialogElement}>
                {message}
            </Dialog>);
    }


}