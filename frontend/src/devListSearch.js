import React from 'react';
import {
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core"

import {
  Search
} from '@material-ui/icons/';

export default function SearchBar() {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <div><TextField
        placeholder="Search"
        InputProps={{
          startAdornment: <InputAdornment position="start"> <Search /></InputAdornment>
        }}
        inputProps={{ 'aria-label': 'search' }}
        size="small"
        class="SearchField"
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