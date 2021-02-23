import React from "react";
import MuiDialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "./DialogTitle"
import DialogBody from "./DialogBody"
import DialogButtons from "./DialogButtons"


export default function Dialog(props) {
    const { title, children } = props;

    return (
        <MuiDialog>
            <DialogTitle>{title}</DialogTitle>
            <DialogBody>{children}</DialogBody>
            <DialogButtons name1={ } onClick1={ } name2={ } onClick2={ } />
        </MuiDialog>
    );
}