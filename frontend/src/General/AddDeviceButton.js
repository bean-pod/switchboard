import React from "react";
import {
    Button,
    withStyles
} from "@material-ui/core"

import {
    AddSharp
} from '@material-ui/icons/';

export default class StreamButton extends React.Component{
    
    render(){

        const StyledButton = withStyles({
            root: {
              background: 'linear-gradient(45deg, #01b2fe 30%, #01b2fe 90%)',
              borderRadius: 90,
              border: 0,
              color: 'white',
              height: 40,
              padding: '0 15px',
            },
            label: {
              textTransform: '',
            },
          })(Button);
          
        return (
            <StyledButton> 
                <AddSharp /> Add Device
            </StyledButton>
        );
    }
}