import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import imagen from '../../images/logo-ucu.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { loginStudent } from '../../services/studentService.js';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../../services/AdminService.js';

const Login = () => {
  const [correoEstudiantil, setCorreoEstudiantil] = useState('');
  const [passwordAlumno, setPasswordAlumno] = useState('');
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setEmailError(false);
    setPasswordError(false);
    setError(null);

    if (!correoEstudiantil) {
      setEmailError(true);
      setError('El correo electrónico es obligatorio.');
      return;
    }

    if (!passwordAlumno) {
      setPasswordError(true);
      setError('La contraseña es obligatoria.');
      return;
    }

    try {
      const data = await loginStudent(correoEstudiantil, passwordAlumno);
      if (data.token === null) {
        setError(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("alumno", correoEstudiantil);
      setError(null);

      if (data.token) {
        if (!await isAdmin(data.token)) {
          console.log("no admin")
          navigate('/homePage');
        } else {
          navigate('/admin');
        }
      }
    } catch (err) {
      console.error('Error de inicio de sesión:', err);
      setError('Error de red. Inténtelo de nuevo más tarde.');
    }
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
    <div style={{ backgroundColor: '#070512' }}>
      <Container maxWidth="sm"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box 
          width={300}
          alignItems="center"
          p={2}
          sx={{ borderRadius: 1, backgroundColor: '#d9d9d927', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
          <Grid container direction="column"
            justifyContent="flex-start"
            alignItems="center">
            <Grid item xs={6} md={8} mt={2}>
              <img src={imagen} style={{ width: '40px', height: '50px' }} alt="Logo UCU" />
            </Grid>
            <Grid item xs={6} md={8} mt={2}>
              <Typography variant="h6" style={{ color: 'white' }} gutterBottom>
                WELCOME TO PENCA UCU
              </Typography>
            </Grid>
            <Grid item xs={6} md={8} mt={2} style={{ width: '100%' }}>
              <TextField
                onChange={(e) => setCorreoEstudiantil(e.target.value)}
                fullWidth
                sx={textFieldStyle}
                id="mailInput"
                label="Mail"
                variant="standard"
                error={emailError}
                helperText={emailError && "El correo electrónico es obligatorio."}
              />
            </Grid>
            <Grid item xs={6} md={8} mt={3} style={{ width: '100%' }}>
              <TextField
                onChange={(e) => setPasswordAlumno(e.target.value)}
                fullWidth
                sx={textFieldStyle}
                id="passwordInput"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                error={passwordError}
                helperText={passwordError && "La contraseña es obligatoria."}
              />
            </Grid>
            {error && (
              <Grid item xs={6} md={8} mt={2} style={{ width: '100%' }}>
                <Typography variant="body2" style={{ color: 'red' }}>{error}</Typography>
              </Grid>
            )}
            <Grid item xs={6} md={8} mt={3} style={{ width: '100%' }}>
              <Button onClick={handleLogin} style={{ width: '100%', background: '#070512' }} variant="contained">Login</Button>
            </Grid>
            <Grid item xs={6} md={12} mt={1}>
              <Link href="/register" style={{ color: 'white' }} underline="hover">
                {'Register'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default Login;
