import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteDeviceDialog from "./DeleteDeviceDialog";
import DeviceInfo from "../../model/DeviceInfo";

class DeleteDeviceDialogOpener extends React.Component {
  constructor(props) {
    super(props);

    this.dialogElement = React.createRef();
    this.openDialog = this.openDialog.bind(this);
  }

  openDialog() {
    this.dialogElement.current.openDialog();
  }

  render() {
    const { device } = this.props;
    return (
      <>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={this.openDialog}
        >
          Delete
        </Button>
        <DeleteDeviceDialog ref={this.dialogElement} device={device} />
      </>
    );
  }
}

export default DeleteDeviceDialogOpener;

DeleteDeviceDialogOpener.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
