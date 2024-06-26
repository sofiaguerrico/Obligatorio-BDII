import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import './PredictionsAdmin.css';
import { getPredictions } from '../../services/prediction';
import { getMatches } from '../../services/play_match';
import flags from '../flags';
import dayjs from 'dayjs';

const PredictionsAdmin = () => {
    const [predictions, setPredictions] = useState([]);
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        async function fetchPredictions() {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log('No token found');
                return; 
            }
            try {
                const matchesData = await getMatches(token);
                const predictionsData = await getPredictions(token);
                const organizedPredictions = matchesData.map(match => {
                    const matchPredictions = predictionsData.filter(prediction => 
                        prediction.equipo1 === match.equipo1 && 
                        prediction.equipo2 === match.equipo2 && 
                        prediction.fecha_hora_partido === match.fecha_hora_partido
                    );
                    return {
                        ...match,
                        predicciones: matchPredictions
                    };
                });

                setPredictions(organizedPredictions);
                setMatches(matchesData);
            } catch (error) {
                console.error('Error fetching predictions:', error);
            }
        }

        fetchPredictions();
    }, []);

    return (
        <div>
            <Typography ml={2} variant="h4" gutterBottom>
                Predictions
            </Typography>
            <div className="contentPrediction">
                {predictions.length > 0 ? predictions.map((match, index) => (
                    <Box key={index} ml={2} mb={3}>
                        <Typography variant="h5">{`${match.equipo1} vs ${match.equipo2}`}</Typography>
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
                                                    <img src={flags[match.equipo1.toLowerCase()]} alt={prediction.equipo1} style={{ width: '30px' }} />
                                                </TableCell>
                                                <TableCell>{prediction.equipo2}</TableCell>
                                                <TableCell align="center">
                                                    <img src={flags[match.equipo2.toLowerCase()]} alt={prediction.equipo2} style={{ width: '30px' }} />
                                                </TableCell>
                                                <TableCell>{dayjs(prediction.fecha_hora_partido).format('dddd, MMMM D, YYYY')} <br />{ dayjs(prediction.fecha_hora_partido).format('h:mm A')}</TableCell>
                                                <TableCell>{prediction.gol_equipo1} - {prediction.gol_equipo2}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                )) : (
                    <Box mt={2}>
                        <Typography>No predictions available</Typography>
                    </Box>
                )}
            </div>
        </div>
    );
};

export default PredictionsAdmin;
