import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import './Profile.css';
import Navbar from '../Navbar/Navbar';
import profilepic from '../../images/profile.png';
import { getByEmail } from '../../services/studentService.js';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({
    nombre_alumno: '',
    apellido_alumno: '',
    ci: '',
    genero_alumno: '',
    celular_alumno: '',
    correo_estudiantil: '',
    password_alumno: '',
    puntos_totales: 0,
    campeon: '',
    subcampeon: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem('token');
      const correo = localStorage.getItem('alumno');
      if (!token || !correo) {
        console.log('No token or correo found');
        return;
      }
      try {
        const userData = await getByEmail(token, correo);
        console.log('Usuario actual:', userData);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('alumno');
    navigate('/');
  };

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
      <Container maxWidth="md" sx={{ display: 'flex', mt: 0.5 }}>
        <Box className="box" sx={{ display: 'flex', flexDirection: 'row', width: '100%', p: 3, borderRadius: 2 }}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <img src={profilepic} alt="Profile" style={{ width: 100, height: 100, marginBottom: 16 }} />
            <Typography variant="h6">User: {user.nombre_alumno.toUpperCase()}</Typography>
          </Box>
          <Box sx={{ flex: 2, ml: 4, '& .MuiTextField-root': { m: 0.5 } }}>
            <Typography variant="h5" gutterBottom>Personal information</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              variant="standard"
              value={user.nombre_alumno}
              onChange={handleInputChange}
              name="nombre_alumno"
              sx={textFieldStyle}
              InputProps={{ readOnly: true }} 
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last name"
              variant="standard"
              value={user.apellido_alumno}
              onChange={handleInputChange}
              name="apellido_alumno"
              sx={textFieldStyle}
              InputProps={{ readOnly: true }} 
            />
            <TextField
              fullWidth
              margin="normal"
              label="ID"
              variant="standard"
              value={user.ci}
              onChange={handleInputChange}
              name="ci"
              sx={textFieldStyle}
              InputProps={{ readOnly: true }} 
            />
            <TextField
              select
              fullWidth
              margin="normal"
              label="Gender"
              variant="standard"
              value={user.genero_alumno}
              onChange={handleInputChange}
              name="genero_alumno"
              sx={textFieldStyle}
              InputProps={{ readOnly: true }} 
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            <TextField
              fullWidth
              margin="normal"
              label="Phone number"
              variant="standard"
              value={user.celular_alumno}
              onChange={handleInputChange}
              name="celular_alumno"
              sx={textFieldStyle}
              InputProps={{ readOnly: true }} 
            />
            <TextField
              fullWidth
              margin="normal"
              label="Mail"
              variant="standard"
              value={user.correo_estudiantil}
              onChange={handleInputChange}
              name="correo_estudiantil"
              sx={textFieldStyle}
              InputProps={{ readOnly: true }} 
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              variant="standard"
              value={user.password_alumno}
              onChange={handleInputChange}
              name="password_alumno"
              sx={textFieldStyle}
              InputProps={{ readOnly: true }} 
            />
            <Box mt={2}>
              <Button onClick={handleLogout} style={{background:'white', color: 'black'}} variant="contained">
                Log Out
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Profile;
