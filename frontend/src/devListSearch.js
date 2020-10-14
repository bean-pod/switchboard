import React from 'react';
import {
    makeStyles,
    TextField,
} from "@material-ui/core"

import {
    Search
} from '@material-ui/icons/';

export default function SearchBar(){
    const classes = useStyles();

    return(
    <div className={classes.search}>
    <div className={classes.searchIcon}><Search /></div>
    <div><TextField
    placeholder="Search…"
      classes={{
        input: classes.inputInput,
      }}
      inputProps={{ 'aria-label': 'search' }}
      variant="outlined" 
      size="small"
    ></TextField>
  </div>
  </div>
    );
}

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        right: 0,
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        alignItems: 'left',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      }
}));