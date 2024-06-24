import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { createStudent } from '../../services/studentService.js';
import './CountrySelection.css';
import Typography from '@mui/material/Typography';

const countries = [
    { value: 'Argentina', label: 'Argentina' },
    { value: 'Uruguay', label: 'Uruguay' }
];

const CountrySelection = ({ formData, onSubmit }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); // Hook de navegación

    const handleFinalSubmit = async (data) => {
        const completeData = {
            ci: formData.ci,
            nombre_alumno: formData.nombre_alumno,
            apellido_alumno: formData.apellido_alumno,
            genero_alumno: formData.genero_alumno,
            celular_alumno: formData.celular_alumno,
            password_alumno: formData.password,
            correo_estudiantil: formData.correo_estudiantil,
            campeon: data.country1,
            subcampeon: data.country2,
            puntos_totales: formData.puntos_totales
        };
        console.log(completeData);

        try {
            const response = await createStudent(completeData);
            localStorage.setItem("alumno", completeData.correo_estudiantil);
            localStorage.setItem("token", response.token); // Guarda el token en localStorage
            navigate('/homePage'); // Redirige a la página de inicio
        } catch (error) {
            console.error('Error al crear alumno:', error);
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
            <Container
                maxWidth="sm"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Box className="box" sx={{ mt: 4 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        INSERT YOUR FIRST PREDICTIONS
                    </Typography>
                    <Typography variant="subtitle1" sx={{ flexGrow: 1, justifyContent: 'center' }}>
                        This predictions can´t be modify
                    </Typography>
                    <form onSubmit={handleSubmit(handleFinalSubmit)}>
                        <Controller
                            name="country1"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Country is required' }}
                            render={({ field }) => (
                                <FormControl variant="standard" sx={textFieldStyle} fullWidth error={!!errors.country1}>
                                    <InputLabel>Winner</InputLabel>
                                    <Select
                                        {...field}
                                        label="Winner"
                                    >
                                        {countries.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.country1 && <p style={{ color: 'red' }}>{errors.country1.message}</p>}
                                </FormControl>
                            )}
                        />
                        <Controller
                            name="country2"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Country is required' }}
                            render={({ field }) => (
                                <FormControl variant="standard" sx={textFieldStyle} fullWidth error={!!errors.country2}>
                                    <InputLabel>Second winner</InputLabel>
                                    <Select
                                        {...field}
                                        label="Second winner"
                                    >
                                        {countries.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.country2 && <p style={{ color: 'red' }}>{errors.country2.message}</p>}
                                </FormControl>
                            )}
                        />
                        <Button type="submit" style={{ background: '#070512' }} fullWidth variant="contained" sx={{ mt: 2 }}>
                            Complete Registration
                        </Button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default CountrySelection;
