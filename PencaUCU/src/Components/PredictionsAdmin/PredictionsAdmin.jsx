import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Grid, Divider } from '@mui/material';
import './PredictionsAdmin.css'
import uruguay from '../../images/uruguay.png';
import argentina from '../../images/argentina.png';
import mexico from '../../images/mexico.png';
import colombia from '../../images/colombia.png';

const PredictionsAdmin = () => {
    const predictions = [
        {
            partido: {
                pais1: "Uruguay",
                bandera1: uruguay,
                pais2: "Argentina",
                bandera2: argentina,
                fecha: "2024-06-01",
                etapa: "Grupo",
                resultado: "1-0"
            },
            predicciones: [
                {
                    correo_estudiantil: 'user1@example.com',
                    equipo1: 'Uruguay',
                    equipo2: 'Argentina',
                    fechaHoraPartido: '2024-06-01T18:00:00Z',
                    gol_equipo1: 1,
                    gol_equipo2: 0,
                },
                {
                    correo_estudiantil: 'user2@example.com',
                    equipo1: 'Uruguay',
                    equipo2: 'Argentina',
                    fechaHoraPartido: '2024-06-01T18:00:00Z',
                    gol_equipo1: 2,
                    gol_equipo2: 1,
                }
            ]
        },
        {
            partido: {
                pais1: "Mexico",
                bandera1: mexico,
                pais2: "Colombia",
                bandera2: colombia,
                fecha: "2024-06-02",
                etapa: "Grupo",
                resultado: "2-2"
            },
            predicciones: [
                {
                    correo_estudiantil: 'user3@example.com',
                    equipo1: 'Mexico',
                    equipo2: 'Colombia',
                    fechaHoraPartido: '2024-06-02T20:00:00Z',
                    gol_equipo1: 2,
                    gol_equipo2: 2,
                }
            ]
        },
        {
            partido: {
                pais1: "Argentina",
                bandera1: argentina,
                pais2: "Mexico",
                bandera2: mexico,
                fecha: "2024-06-03",
                etapa: "Grupo",
                resultado: "0-1"
            },
            predicciones: [
                {
                    correo_estudiantil: 'user4@example.com',
                    equipo1: 'Argentina',
                    equipo2: 'Mexico',
                    fechaHoraPartido: '2024-06-03T15:00:00Z',
                    gol_equipo1: 1,
                    gol_equipo2: 2,
                }
            ]
        },
        {
            partido: {
                pais1: "Uruguay",
                bandera1: uruguay,
                pais2: "Colombia",
                bandera2: colombia,
                fecha: "2024-06-04",
                etapa: "Grupo",
                resultado: "3-1"
            },
            predicciones: [
                {
                    correo_estudiantil: 'user5@example.com',
                    equipo1: 'Uruguay',
                    equipo2: 'Colombia',
                    fechaHoraPartido: '2024-06-04T17:30:00Z',
                    gol_equipo1: 3,
                    gol_equipo2: 1,
                },
                {
                    correo_estudiantil: 'user6@example.com',
                    equipo1: 'Uruguay',
                    equipo2: 'Colombia',
                    fechaHoraPartido: '2024-06-04T17:30:00Z',
                    gol_equipo1: 2,
                    gol_equipo2: 0,
                }
            ]
        }
    ];

    // Función para renderizar la bandera según el nombre del equipo
    const renderFlag = (teamName) => {
        switch (teamName) {
            case 'Uruguay':
                return uruguay;
            case 'Argentina':
                return argentina;
            case 'Mexico':
                return mexico;
            case 'Colombia':
                return colombia;
            default:
                return null;
        }
    };

    return (
        <div >
            <Typography ml={2} variant="h4" gutterBottom>
                Predictions
            </Typography>
            <div className="contentPrediction">
                {predictions.map((match, index) => (
                    <Box key={index} ml={2} mb={3}>
                        <Typography variant="h5">{`${match.partido.pais1} vs ${match.partido.pais2}`}</Typography>
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
                                                <TableCell>{new Date(prediction.fechaHoraPartido).toLocaleString()}</TableCell>
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
