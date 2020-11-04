import React from "react";
import {
    Button,
    withStyles
} from "@material-ui/core"

import { NavLink } from 'react-router-dom';
import {
    AddSharp
} from '@material-ui/icons/';

export default class StreamButton extends React.Component {

    render() {

        const StyledButton = withStyles({
            root: {
                background: 'linear-gradient(45deg, #01b2fe 30%, #01b2fe 90%)',
                borderRadius: 90,
                border: 0,
                color: 'white',
                height: 40,
                padding: '0px'
            },
            label: {
                textTransform: '',
            },
        })(Button);

        return (
            <StyledButton>
                <NavLink
                    to="/Devices"
                    activeClassName="buttonText"
                    className="buttonText"
                    exact
                >
                    <AddSharp /> Add Device
                </NavLink>
            </StyledButton>
        );
    }
}