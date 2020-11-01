import React from "react";
import {
    Button,
    withStyles
} from "@material-ui/core"

import {
    SwapHoriz
} from '@material-ui/icons/';

export default class StreamButton extends React.Component{
    
    render(){

        const StyledButton = withStyles({
            root: {
              background: 'linear-gradient(45deg, #59bc31 30%, #59bc31 90%)',
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
                <SwapHoriz /> Stream
            </StyledButton>
        );
    }
}