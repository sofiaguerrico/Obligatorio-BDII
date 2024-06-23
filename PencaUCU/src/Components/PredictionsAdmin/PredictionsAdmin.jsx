
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Grid, Divider } from '@mui/material';
import './PredictionsAdmin.css'
import uruguay from '../../images/uruguay.png';
import argentina from '../../images/argentina.png';
import mexico from '../../images/mexico.png';
import colombia from '../../images/colombia.png';
import { findPredictionForMatch } from '../../services/prediction';
import { getMatches } from '../../services/play_match';

const PredictionsAdmin = () => {
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        async function fetchPredictions() {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log('No token found');
                return; // No hay token, salir
            }
            try {    
                const matches = await getMatches();
                const predictionsData = await Promise.all(matches.map(async match => {
                    const predicciones = await findPredictionForMatch(match.equipo1, match.equipo2, match.fecha_hora_partido);
                    return {
                        partido: {
                            equipo1: match.equipo1,
                            bandera1: match.bandera1,
                            equipo2: match.equipo2,
                            bandera2: match.bandera2,
                            fecha_hora_partido: match.fecha_hora_partido,
                            etapa: match.etapa,
                            resultado: getResult(match.gol_equipo1, match.gol_equipo2)
                        },
                        predicciones: predicciones
                    };  
                }));

                setPredictions(predictionsData);

            } catch (error) {
                console.error('Error fetching predictions:', error);
                // Mostrar error al admin
            }

        }

        fetchPredictions();
    }, []);

    function getResult(gol_equipo1, gol_equipo2) {
        return `${gol_equipo1} - ${gol_equipo2}`;
    }

    

    // Función para renderizar la bandera según el nombre del equipo
    const renderFlag = (teamName) => {
        switch (teamName) {
            case 'Uruguay':
                return flags.uruguay;
            case 'Argentina':
                return flags.argentina;
            case 'Mexico':
                return flags.mexico;
            case 'Colombia':
                return flags.colombia;
            default:
                return null;
        }
    };

    return (
        <div>
            <Typography ml={2} variant="h4" gutterBottom>
                Predictions
            </Typography>
            <div className="contentPrediction">
                {predictions.map((match, index) => (
                    <Box key={index} ml={2} mb={3}>
                        <Typography variant="h5">{`${match.partido.equipo1} vs ${match.partido.equipo2}`}</Typography>
                        <Box mt={2}>
                            <TableContainer component={Paper} mt={2}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Team 1</TableCell>
                                            <TableCell align="center">Flag 1</TableCell>
                                            <TableCell>Team 2</TableCell>
                                            <TableCell align="center">Flag 2</TableCell>
                                            <TableCell>Date & Time</TableCell>
                                            <TableCell>Prediction</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {match.predicciones.map((prediction, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell>{prediction.correo_estudiantil}</TableCell>
                                                <TableCell>{prediction.equipo1}</TableCell>
                                                <TableCell align="center">
                                                    <img src={renderFlag(prediction.equipo1)} alt={prediction.equipo1} style={{ width: '30px' }} />
                                                </TableCell>
                                                <TableCell>{prediction.equipo2}</TableCell>
                                                <TableCell align="center">
                                                    <img src={renderFlag(prediction.equipo2)} alt={prediction.equipo2} style={{ width: '30px' }} />
                                                </TableCell>
                                                <TableCell>{new Date(prediction.fecha_hora_partido).toLocaleString()}</TableCell>
                                                <TableCell>{prediction.gol_equipo1} - {prediction.gol_equipo2}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                ))}
                {predictions.length === 0 && (
                    <Box mt={2}>
                        <Typography>No predictions available</Typography>
                    </Box>
                )}
            </div>
        </div>
    );
};

export default PredictionsAdmin;
