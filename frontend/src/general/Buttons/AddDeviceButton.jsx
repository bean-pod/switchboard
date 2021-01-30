import React from "react";
import {Button, withStyles} from "@material-ui/core";
import {AddSharp} from "@material-ui/icons/";
import PropTypes from "prop-types";

export default class AddDeviceButton extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
    }

    render() {
        const StyledButton = withStyles({
            root: {
                background: "linear-gradient(45deg, #01b2fe 30%, #01b2fe 90%)",
                borderRadius: 90,
                border: 0,
                color: "white",
                height: 40,
                padding: "0px"
            },
            label: {
                textTransform: ""
            }
        })(Button);

        return (
            <StyledButton id={this.id}>
                <div className="buttonText">
                    <AddSharp/>
                    Add Device
                </div>
            </StyledButton>
        );
    }
}
AddDeviceButton.propTypes = {
    id: PropTypes.string.isRequired
};
