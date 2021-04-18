import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5">Bootcamps</Typography>
      </Toolbar>
    </AppBar>

  );
}

export default Navbar;
