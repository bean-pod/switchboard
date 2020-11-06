import React from "react";
import {
    Button,
    withStyles
} from "@material-ui/core"

import {
    SwapHoriz
} from '@material-ui/icons/';

export default class StreamButton extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
    }
    render() {

        const StyledButton = withStyles({
            root: {
                background: 'linear-gradient(45deg, #59bc31 30%, #59bc31 90%)',
                borderRadius: 90,
                border: 0,
                color: 'white',
                height: 40,
                padding: '0 5px',
                margin: '1em'
            },
            label: {
                textTransform: '',
            },
        })(Button);

        return (
            <StyledButton id={this.id} >
                <div className="buttonText">
                    <SwapHoriz /> Stream
                </div>
            </StyledButton>
        );
    }
}