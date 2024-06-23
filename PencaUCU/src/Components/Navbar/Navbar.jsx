import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import imagen from '../../images/logo-ucu.png';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <AppBar style={{ backgroundColor: '#070512' }} position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
        </IconButton>
        <img src={imagen} style={{ width: '40px', height: '50px', padding: '5px' }} alt="Logo UCU" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Penca UCU
        </Typography>
        <Button color="inherit" component={Link} to="/homePage">Home Page</Button>
        <Button color="inherit" component={Link} to="/fixture">Fixture</Button>
        <Button color="inherit" component={Link} to="/userPrediction">Predictions</Button>
        <Button color="inherit" component={Link} to="/ranking">Ranking</Button>
        <Button color="inherit" component={Link} to="/profile">Profile</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;
