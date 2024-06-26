import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import CountrySelection from '../CountrySelection/CountrySelection.jsx';
import { fetchAllCareer } from '../../services/CareerService.js';

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const Register = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const [formData, setFormData] = useState(null);
  const [careers, setCareers] = useState([]);

  const onSubmit = (data) => {
    setFormData({
      ci: parseInt(data.id, 10),
      nombre_alumno: data.name,
      apellido_alumno: data.lastName,
      genero_alumno: data.gender,
      celular_alumno: data.phoneNumber,
      correo_estudiantil: data.mail,
      password: data.password,
      carrera: data.carrera,
      puntos_totales: "0"
    });
  };

  useEffect(() => {
    async function fetchCareer() {
      try {
        const careerData = await fetchAllCareer();
        setCareers(careerData);
        console.log(careerData);
      } catch (error) {
        console.error('Error fetching careers:', error);
      }
    }

    fetchCareer();
  }, []);

  const handleFinalSubmit = (completeData) => {
    console.log('Complete data:', completeData);
    localStorage.setItem("token", completeData.token);
  };

  if (formData) {
    return <CountrySelection formData={formData} onSubmit={handleFinalSubmit} />;
  }

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

  const errorStyle = {
    '& .MuiInput-underline:after': {
      borderBottomColor: 'red',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'red',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: 'red',
    },
  };

  return (
    <div style={{ backgroundColor: '#070512' }}>
      <Container
        maxWidth="sm"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box
          height={570}
          width={350}
          alignItems="center"
          p={2}
          sx={{ borderRadius: 1, backgroundColor: '#d9d9d927', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="center">
              <Grid item xs={6} md={8}>
                <Typography variant="h6" style={{ color: 'white' }}>
                  CREATE NEW ACCOUNT
                </Typography>
              </Grid>
              <Grid item xs={6} md={8} style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  sx={errors.name ? { ...textFieldStyle, ...errorStyle } : textFieldStyle}
                  id="nameInput"
                  label="Name"
                  variant="standard"
                  error={!!errors.name}
                  {...register('name', { required: 'Is Required' })}
                />
              </Grid>
              <Grid item xs={6} md={8} style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  sx={errors.lastName ? { ...textFieldStyle, ...errorStyle } : textFieldStyle}
                  id="lastNameInput"
                  label="Last name"
                  variant="standard"
                  error={!!errors.lastName}
                  {...register('lastName', { required: 'Is Required' })}
                />
              </Grid>
              <Grid item xs={6} md={8} style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  sx={errors.id ? { ...textFieldStyle, ...errorStyle } : textFieldStyle}
                  id="idInput"
                  label="ID"
                  type="number"
                  variant="standard"
                  error={!!errors.id}
                  {...register('id', { required: 'Is Required' })}
                />
              </Grid>
              <Grid item xs={6} md={8} style={{ width: '100%' }}>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Is Required' }}
                  render={({ field }) => (
                    <TextField
                      sx={errors.gender ? { ...textFieldStyle, ...errorStyle } : textFieldStyle}
                      fullWidth
                      id="genderInput"
                      select
                      label="Gender"
                      variant="standard"
                      error={!!errors.gender}
                      {...field}
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={6} md={8} style={{ width: '100%' }}>
                <Controller
                  name="carrera"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Is Required' }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      sx={errors.carrera ? { ...textFieldStyle, ...errorStyle } : textFieldStyle}
                      id="carreraInput"
                      select
                      label="Career"
                      variant="standard"
                      error={!!errors.carrera}
                      {...field}
                    >
                      {careers.map((career) => (
                        <MenuItem key={career.nombre_carrera} value={career.nombre_carrera}>
                          {career.nombre_carrera}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={6} md={8} style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  sx={errors.phoneNumber ? { ...textFieldStyle, ...errorStyle } : textFieldStyle}
                  id="phoneNumberInput"
                  label="Phone number"
                  type="number"
                  variant="standard"
                  error={!!errors.phoneNumber}
                  {...register('phoneNumber', { required: 'Is Required' })}
                />
              </Grid>
              <Grid item xs={6} md={8} style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  sx={errors.mail ? { ...textFieldStyle, ...errorStyle } : textFieldStyle}
                  id="mailInput"
                  label="Mail"
                  variant="standard"
                  error={!!errors.mail}
                  {...register('mail', { required: 'Is Required' })}
                />
              </Grid>
              <Grid item xs={6} md={8} style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  sx={errors.password ? { ...textFieldStyle, ...errorStyle } : textFieldStyle}
                  id="passwordInput"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  error={!!errors.password}
                  {...register('password', { required: 'Is Required' })}
                />
              </Grid>
              <Grid item xs={6} md={8} style={{ width: '100%', marginTop: '16px' }}>
                <Button type="submit" style={{ width: '100%', background: '#070512' }} variant="contained">Next</Button>
              </Grid>
              <Grid item xs={6} md={12} style={{ marginTop: '8px' }}>
                <Link href="/" style={{ color: 'white' }} underline="hover">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
