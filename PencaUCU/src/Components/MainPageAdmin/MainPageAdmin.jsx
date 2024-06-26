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
import { getMatches } from '../../services/play_match.js';
import flags from '../flags.js';
import { getAllStudents } from '../../services/studentService.js';
import { getPredictions } from '../../services/prediction.js';
import EnterResult from '../EnterResult/EnterResult';
import dayjs from 'dayjs';

const MainPageAdmin = () => {
    const [usersCount, setUsersCount] = useState(0);
    const [matchesCount, setMatchesCount] = useState(0);
    const [predictionsCount, setPredictionsCount] = useState(0);
    const [partidos, setPartidos] = useState([]);
    const [error, setError] = useState(null);
    const [students, setStudents] = useState([]);
    const [genderData, setGenderData] = useState([]);
    const [selectedPartido, setSelectedPartido] = useState(null);

    useEffect(() => {
        async function fetchMatches() {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found');
                return;
            }
            try {
                const matches = await getMatches(token);
                setPartidos(matches);
                setMatchesCount(matches.length);
                console.log(matches);
            } catch (error) {
                console.error('Error fetching matches:', error);
                setError('Error al cargar los partidos');
            }
        }

        fetchMatches();
    }, []);

    useEffect(() => {
        async function fetchStudents() {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found');
                return;
            }
            try {
                const students = await getAllStudents(token);
                setStudents(students);
                setUsersCount(students.length);

                const genderCounts = students.reduce((acc, student) => {
                    acc[student.genero_alumno] = (acc[student.genero_alumno] || 0) + 1;
                    return acc;
                }, {});

                const genderChartData = Object.keys(genderCounts).map((gender, index) => ({
                    id: index,
                    value: genderCounts[gender],
                    label: gender.charAt(0).toUpperCase() + gender.slice(1),
                }));

                setGenderData(genderChartData);

            } catch (error) {
                console.error('Error fetching students:', error);
            }
        }

        fetchStudents();
    }, []);

    useEffect(() => {
        async function fetchPredictions() {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found');
                return;
            }
            try {
                const predictions = await getPredictions(token);
                setPredictionsCount(predictions.length);
            } catch (error) {
                console.error('Error fetching predictions:', error);
            }
        }

        fetchPredictions();
    }, []);

    const handleEnterResult = (partido) => {
        setSelectedPartido(partido);
    };


    return (
        <div>
            {selectedPartido ? (
                <EnterResult partido={selectedPartido} />
            ) : (
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
                                <TableContainer component={Paper} style={{ maxHeight: 350, overflowY: 'auto' }}>
                                    <Table stickyHeader>
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
                                                    <TableCell>{partido.equipo1}</TableCell>
                                                    <TableCell><img src={flags[partido.equipo1.toLowerCase()]} alt={partido.equipo1} style={{ width: '30px' }} /></TableCell>
                                                    <TableCell>{partido.equipo2}</TableCell>
                                                    <TableCell><img src={flags[partido.equipo2.toLowerCase()]} alt={partido.equipo2} style={{ width: '30px' }} /></TableCell>
                                                    <TableCell>{dayjs(partido.fecha_hora_partido).format('dddd, MMMM D, YYYY')} <br />{ dayjs(partido.fecha_hora_partido).format('h:mm A')}</TableCell>
                                                    <TableCell>
                                                        {partido.gol_equipo1 === -1 && partido.gol_equipo2 === -1 ? (
                                                            "-"
                                                        ) : (
                                                            `${partido.gol_equipo1}-${partido.gol_equipo2}`
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {partido.gol_equipo1 === -1 && partido.gol_equipo2 === -1 ? (
                                                            <Button variant="contained" style={{background: '#070512'}} onClick={() => handleEnterResult(partido)}>Enter</Button>
                                                        ) : (
                                                            "Finished"
                                                        )}
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
                                            data: genderData,
                                        },
                                    ]}
                                    width={350}
                                    height={200}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

export default MainPageAdmin;
