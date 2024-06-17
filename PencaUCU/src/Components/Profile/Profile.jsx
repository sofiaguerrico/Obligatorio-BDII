import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import './Profile.css';
import Navbar from '../Navbar/Navbar';
import profilepic from '../../images/profile.png';

const Profile = () => {
  const textFieldStyle = {
    '& .MuiInputBase-input': {
        
        color: '#ffffff', 
      },
    '& .MuiInputLabel-root': {
        color: '#ffffff', 
      },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#ffffff',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ffffff',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: '#ffffff', 
    },
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" sx={{ display: 'flex', mt: 4 }}>
        <Box className="box" sx={{ display: 'flex', flexDirection: 'row', width: '100%', p: 3, borderRadius: 2 }}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <img src={profilepic} alt="Profile" style={{ width: 100, height: 100, marginBottom: 16 }} />
            <Typography variant="h6">Profiles name</Typography>
          </Box>
          <Box sx={{ flex: 2, ml: 4 ,'& .MuiTextField-root': { m: 0.5 } }}>
            <Typography variant="h5" gutterBottom>Personal information</Typography>
            <TextField fullWidth margin="normal" label="Name" variant="standard" sx={textFieldStyle} />
            <TextField fullWidth margin="normal" label="Last name" variant="standard" sx={textFieldStyle} />
            <TextField fullWidth margin="normal" label="ID" variant="standard" sx={textFieldStyle} />
            <TextField select fullWidth margin="normal" label="Gender" variant="standard" sx={textFieldStyle}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            <TextField fullWidth margin="normal" label="Phone number" variant="standard" sx={textFieldStyle} />
            <TextField fullWidth margin="normal" label="Mail" variant="standard" sx={textFieldStyle} />
            <TextField fullWidth margin="normal" label="Password" type="password" variant="standard" sx={textFieldStyle} />
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Profile;
