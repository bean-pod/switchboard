import React from 'react';
import {
    Button,
    Grid,
    List,
    ListItem,
    ListItemText
} from "@material-ui/core"

import {
    SwapHoriz
} from '@material-ui/icons/';

export default class StreamingTable extends React.Component{

    generate(element) {
        return [0, 1, 2].map((value) =>
          React.cloneElement(element, {
            key: value,}),
        );
    }

    render(){
        return(
            <React.Fragment>
                
                <Grid container spacing={2} alignContent={"center"} alignItems={"center"}  justify = {'center'}>
                    <Grid item >
                        <List dense="true">
                        {this.generate(
                            <ListItem button>
                                <ListItemText
                                    primary="Sender"
                                />
                            </ListItem>,
                        )}
                        </List>
                    </Grid>
                    <Grid item><Button class="green buttonText">
                            <SwapHoriz /> Stream
                        </Button></Grid>
                    <Grid item>
                        <List dense="true">
                        {this.generate(
                            <ListItem button>
                            <ListItemText
                                primary="Receiver"
                            />
                            </ListItem>,
                        )}
                        </List>
                    </Grid>
                </Grid>
           
        </React.Fragment>
        );
        
    }
}