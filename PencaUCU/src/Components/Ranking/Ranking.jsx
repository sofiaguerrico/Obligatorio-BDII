import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import './Ranking.css';
import { getRanking } from '../../services/RankingService.js';

const Ranking = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [userPosition, setUserPosition] = useState(null);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                console.log('Obteniendo token del localStorage');
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log('No se encontró token');
                    return;
                }

                console.log('Llamando a getRanking con token:', token);
                const rankingData = await getRanking(token);
                console.log('Ranking obtenido:', rankingData);

                const userCorreo = localStorage.getItem('alumno'); 
                setAlumnos(rankingData);
                const position = rankingData.findIndex((alumno) => alumno.correo_estudiantil === userCorreo);
                setUserPosition(position !== -1 ? position + 1 : null);
            } catch (error) {
                console.error('Error fetching ranking:', error);
            }
        };

        fetchRanking();
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
                    sx={{ borderRadius: 1, backgroundColor: '#070512', color: 'white' }}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        {userPosition && (
                            <Typography variant="h5" gutterBottom>
                                Your position: #{userPosition}
                            </Typography>
                        )}
                        {alumnos.map((alumno, index) => (
                            <Grid item key={index}>
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
