import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import flags from '../flags.js'; 
const MainPageAdmin = () => {
    const [usersCount, setUsersCount] = useState(0);
    const [matchesCount, setMatchesCount] = useState(0);
    const [predictionsCount, setPredictionsCount] = useState(0);

    useEffect(() => {
        setUsersCount(50);
        setMatchesCount(4);
        setPredictionsCount(10);
    }, []);

    const partidos = [
        {
            pais1: "Uruguay",
            bandera1: flags.uruguay, // Usa las claves del objeto flags para las banderas
            pais2: "Argentina",
            bandera2: flags.argentina,
            fecha: new Date().toISOString().split('T')[0],
            etapa: "Group Stage",
            resultado: "1-0"
        },
        {
            pais1: "Mexico",
            bandera1: flags.mexico,
            pais2: "Colombia",
            bandera2: flags.colombia,
            fecha: new Date().toISOString().split('T')[0],
            etapa: "Group Stage",
            resultado: "2-2"
        },
        {
            pais1: "Argentina",
            bandera1: flags.argentina,
            pais2: "Mexico",
            bandera2: flags.mexico,
            fecha: new Date().toISOString().split('T')[0],
            etapa: "Group Stage",
            resultado: "0-1"
        },
        {
            pais1: "Uruguay",
            bandera1: flags.uruguay,
            pais2: "Colombia",
            bandera2: flags.colombia,
            fecha: "2024-06-04",
            etapa: "Group Stage",
            resultado: "3-1"
        }
    ];

    return (
        <div>
            <Grid container ml={1} mt={0.5} spacing={2} style={{ marginBottom: '20px' }}>
                <Grid item xs={8}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                p={1}
                                sx={{ background: '#070512', height: 150, borderRadius: 2 }}
                            >
                                <Typography variant="h6" style={{ color: 'white' }}>Users in the system</Typography>
                                <Typography variant="h4" style={{ color: 'white', marginTop: '5px' }}>{usersCount}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                p={1}
                                sx={{ background: '#070512', height: 150, borderRadius: 2 }}
                            >
                                <Typography variant="h6" style={{ color: 'white' }}>Number of matches</Typography>
                                <Typography variant="h4" style={{ color: 'white', marginTop: '5px' }}>{matchesCount}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                p={1}
                                sx={{ background: '#070512', height: 150, borderRadius: 2 }}
                            >
                                <Typography variant="h6" style={{ color: 'white' }}>Predictions</Typography>
                                <Typography variant="h4" style={{ color: 'white', marginTop: '5px' }}>{predictionsCount}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4" style={{ marginBottom: '10px' }}>Matches</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Country</TableCell>
                                            <TableCell>Flag</TableCell>
                                            <TableCell>Country</TableCell>
                                            <TableCell>Flag</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Result</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {partidos.map((partido, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{partido.pais1}</TableCell>
                                                <TableCell><img src={partido.bandera1} alt={partido.pais1} style={{ width: '30px' }} /></TableCell>
                                                <TableCell>{partido.pais2}</TableCell>
                                                <TableCell><img src={partido.bandera2} alt={partido.pais2} style={{ width: '30px' }} /></TableCell>
                                                <TableCell>{partido.fecha}</TableCell>
                                                <TableCell>{partido.resultado}</TableCell>
                                                <TableCell>
                                                    <Button variant="contained" color="primary">Enter</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 10, label: 'Female' },
                                            { id: 1, value: 15, label: 'Male' },
                                            { id: 2, value: 20, label: 'Others' },
                                        ],
                                    },
                                ]}
                                width={350}
                                height={200}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default MainPageAdmin;
