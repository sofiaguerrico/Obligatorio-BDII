import React, { useState } from 'react';
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
import imagen from '../../images/logo-ucu.png';

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const careers = [
  { value: 'cs', label: 'Computer Science' },
  { value: 'eng', label: 'Engineering' },
  { value: 'bus', label: 'Business' },
  { value: 'art', label: 'Arts' },
];

const Register = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const [formData, setFormData] = useState(null);

  const onSubmit = (data) => {
    setFormData({
      ci: parseInt(data.id, 10),
      nombre_alumno: data.name,
      apellido_alumno: data.lastName,
      genero_alumno: data.gender,
      celular_alumno: data.phoneNumber,
      carrera: data.carrera,
      correo_estudiantil: data.mail,
      password: data.password
    });
  };

  const handleFinalSubmit = (completeData) => {
    console.log('Complete data:', completeData);
  };

  if (formData) {
    return <CountrySelection formData={formData} onSubmit={handleFinalSubmit} />;
  }

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
                  id="nameInput"
                  label={errors.name ? 'Name' : 'Name'}
                  variant="standard"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ''}
                  {...register('name', { required: 'Is Required' })}
                />
              </Grid>
              <Grid item xs={6} md={8} style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  id="lastNameInput"
                  label={errors.lastName ? 'Last name' : 'Last name'}
                  variant="standard"
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ''}
                  {...register('lastName', { required: 'Is Required' })}
                />
              </Grid>
              <Grid item xs={6} md={8} style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  id="idInput"
                  label={errors.id ? 'ID' : 'ID'}
                  type="number"
                  variant="standard"
                  error={!!errors.id}
                  helperText={errors.id ? errors.id.message : ''}
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
                      fullWidth
                      id="genderInput"
                      select
                      label={errors.gender ? 'Gender' : 'Gender'}
                      variant="standard"
                      error={!!errors.gender}
                      helperText={errors.gender ? errors.gender.message : ''}
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
                      id="carreraInput"
                      select
                      label={errors.carrera ? 'Career' : 'Carrera'}
                      variant="standard"
                      error={!!errors.carrera}
                      helperText={errors.carrera ? errors.carrera.message : ''}
                      {...field}
                    >
                      {careers.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={6} md={8} style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  id="phoneNumberInput"
                  label={errors.phoneNumber ? 'Phone number' : 'Phone number'}
                  type="number"
                  variant="standard"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
                  {...register('phoneNumber', { required: 'Is Required' })}
                />
              </Grid>
              <Grid item xs={6} md={8} style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  id="mailInput"
                  label={errors.mail ? 'Mail' : 'Mail'}
                  variant="standard"
                  error={!!errors.mail}
                  helperText={errors.mail ? errors.mail.message : ''}
                  {...register('mail', { required: 'Is Required' })}
                />
              </Grid>
              <Grid item xs={6} md={8} style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  id="passwordInput"
                  label={errors.password ? 'Password' : 'Password'}
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
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
