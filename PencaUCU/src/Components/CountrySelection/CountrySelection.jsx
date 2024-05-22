import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { createStudent } from '../../services/studentService.js';

const countries = [
    { value: 'Argentina', label: 'Argentina' },
    { value: 'Uruguay', label: 'Uruguay' }
];

const CountrySelection = ({ formData, onSubmit }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const handleFinalSubmit = async (data) => {
        console.log(formData)
        const completeData = {
            alumni: {
                ci: formData.ci,
                nombre_alumno: formData.nombre_alumno,
                apellido_alumno: formData.apellido_alumno,
                genero_alumno: formData.genero_alumno,
                celular_alumno: formData.celular_alumno,
                carrera: formData.carrera,
                correo_estudiantil: formData.correo_estudiantil,
                campeon: data.country1,
                subcampeon: data.country2,
            },
            password: formData.password,
        };
        console.log(completeData)

        try {
            const response = await createStudent(completeData);
            onSubmit(response);
        } catch (error) {
            console.error('Error al crear alumno:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <form onSubmit={handleSubmit(handleFinalSubmit)}>
                    <Controller
                        name="country1"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Country is required' }}
                        render={({ field }) => (
                            <TextField
                                select
                                label="Select Country 1"
                                fullWidth
                                error={!!errors.country1}
                                helperText={errors.country1 ? errors.country1.message : ''}
                                {...field}
                            >
                                {countries.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Controller
                        name="country2"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Country is required' }}
                        render={({ field }) => (
                            <TextField
                                select
                                label="Select Country 2"
                                fullWidth
                                error={!!errors.country2}
                                helperText={errors.country2 ? errors.country2.message : ''}
                                {...field}
                            >
                                {countries.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                        Complete Registration
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default CountrySelection;
