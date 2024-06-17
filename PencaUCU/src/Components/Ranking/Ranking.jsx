import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import './Ranking.css';

const Ranking = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [userPosition, setUserPosition] = useState(null);

    useEffect(() => {
        // Simulación de los datos de los alumnos obtenidos de la API
        const alumnos = [
            { correo_estudiantil: 'correo1@example.com', nombre_alumno: 'Juan', apellido_alumno: 'Pérez', puntos_totales: 100 },
            { correo_estudiantil: 'correo2@example.com', nombre_alumno: 'María', apellido_alumno: 'González', puntos_totales: 90 },
            { correo_estudiantil: 'correo3@example.com', nombre_alumno: 'Pedro', apellido_alumno: 'Martínez', puntos_totales: 80 },
            { correo_estudiantil: 'correo4@example.com', nombre_alumno: 'Luis', apellido_alumno: 'Gómez', puntos_totales: 95 },
            { correo_estudiantil: 'correo5@example.com', nombre_alumno: 'Ana', apellido_alumno: 'Sánchez', puntos_totales: 85 },
            { correo_estudiantil: 'correo6@example.com', nombre_alumno: 'Carlos', apellido_alumno: 'Fernández', puntos_totales: 75 },
            { correo_estudiantil: 'correo7@example.com', nombre_alumno: 'Laura', apellido_alumno: 'López', puntos_totales: 92 },
            { correo_estudiantil: 'correo8@example.com', nombre_alumno: 'Sofía', apellido_alumno: 'Hernández', puntos_totales: 87 },
            { correo_estudiantil: 'correo9@example.com', nombre_alumno: 'Daniel', apellido_alumno: 'Díaz', puntos_totales: 83 },
            { correo_estudiantil: 'correo10@example.com', nombre_alumno: 'Marta', apellido_alumno: 'Rodríguez', puntos_totales: 78 },
            { correo_estudiantil: 'correo11@example.com', nombre_alumno: 'Javier', apellido_alumno: 'Álvarez', puntos_totales: 96 },
            { correo_estudiantil: 'correo12@example.com', nombre_alumno: 'Elena', apellido_alumno: 'Gutiérrez', puntos_totales: 88 },
            { correo_estudiantil: 'correo13@example.com', nombre_alumno: 'Diego', apellido_alumno: 'Moreno', puntos_totales: 82 },
            { correo_estudiantil: 'correo14@example.com', nombre_alumno: 'Carmen', apellido_alumno: 'Navarro', puntos_totales: 79 },
            { correo_estudiantil: 'correo15@example.com', nombre_alumno: 'Isabel', apellido_alumno: 'Ruiz', puntos_totales: 74 },
        ];
        
        const user = { correo_estudiantil: 'correo@example.com', nombre_alumno: 'Sofia', apellido_alumno: 'Guerrico', puntos_totales: 85 };

        const sortedAlumnos = [...alumnos, user].sort((a, b) => b.puntos_totales - a.puntos_totales);

        setAlumnos(sortedAlumnos);

        const position = sortedAlumnos.findIndex((alumno) => alumno.correo_estudiantil === user.correo_estudiantil);
        setUserPosition(position !== -1 ? position + 1 : null);
    }, []);

    return (
        <div>
            <Navbar />
            <Container
                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                <Box>
                    <Typography variant="h4" gutterBottom>
                        RANKING
                    </Typography>
                </Box>
                <Box
                    className='scroll'
                    width={500}
                    alignItems="center"
                    p={2}
                    sx={{ borderRadius: 1, backgroundColor: '#070512', color:'white' }}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                    {userPosition && (
                    <Typography variant="h5" gutterBottom>
                        Tu posición en el ranking: #{userPosition}
                    </Typography>
                )}
                        {alumnos.map((alumno, index) => (
                            <Grid  item key={index}>
                                <Typography variant="body1" gutterBottom>
                                    {`${index + 1}. ${alumno.nombre_alumno} ${alumno.apellido_alumno} - ${alumno.puntos_totales}`}
                                </Typography>
                                <hr />
                            </Grid>
                            
                        ))}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default Ranking;
