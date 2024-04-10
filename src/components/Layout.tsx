import React from 'react';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className="my-styled-link">
            <Box display="flex" flexGrow={1}>
              <Typography component="div">TODO App</Typography>
            </Box>
          </Link>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default Layout;
