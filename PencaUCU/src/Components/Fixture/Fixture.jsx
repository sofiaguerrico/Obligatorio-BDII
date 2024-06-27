import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import { getMatches } from '../../services/play_match.js';
import flags from '../flags.js';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Fixture.css';
import dayjs from 'dayjs';

const Fixture = () => {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    async function fetchPartidos() {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const partidosData = await getMatches(token);
        setPartidos(partidosData);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    }
    fetchPartidos();
  }, []);

  const partidosPorEtapa = partidos.reduce((acc, partido) => {
    if (!acc[partido.etapa]) {
      acc[partido.etapa] = [];
    }
    acc[partido.etapa].push(partido);
    return acc;
  }, {});

  const equipos = [
    { nombre: 'Argentina', bandera: flags.argentina },
    { nombre: 'Bolivia', bandera: flags.bolivia },
    { nombre: 'Brasil', bandera: flags.brasil },
    { nombre: 'Canada', bandera: flags.canadá },
    { nombre: 'Chile', bandera: flags.chile },
    { nombre: 'Colombia', bandera: flags.colombia },
    { nombre: 'Costa Rica', bandera: flags.costa_rica },
    { nombre: 'Ecuador', bandera: flags.ecuador },
    { nombre: 'Estados Unidos', bandera: flags.united_states },
    { nombre: 'Jamaica', bandera: flags.jamaica },
    { nombre: 'Mexico', bandera: flags.méxico },
    { nombre: 'Panama', bandera: flags.panamá },
    { nombre: 'Paraguay', bandera: flags.paraguay },
    { nombre: 'Perú', bandera: flags.perú },
    { nombre: 'Uruguay', bandera: flags.uruguay },
    { nombre: 'Venezuela', bandera: flags.venezuela },
  ];

  return (
    <div>
      <Navbar />
      <Grid container spacing={5}>
        <Grid item ml={2} xs={8}>
          <div className='partidos'>
            <Typography variant="h4" style={{ color: 'black', textAlign: 'center' }} gutterBottom>
              MATCHES
            </Typography>
            {Object.keys(partidosPorEtapa).map(etapa => (
              <Box key={etapa} sx={{ mb: 3 }}>
                <Typography variant="h5" style={{ color: 'black', marginTop: '20px' }}>
                  {etapa}
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Match</TableCell>
                        <TableCell>Date and Time</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Result</TableCell>
                        <TableCell>Country</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {partidosPorEtapa[etapa].map((partido, index) => (
                        <TableRow key={index}>
                          <TableCell>{`${partido.equipo1} vs ${partido.equipo2}`}</TableCell>
                          <TableCell>{dayjs(partido.fecha_hora_partido).format('dddd, MMMM D, YYYY')} <br />{ dayjs(partido.fecha_hora_partido).format('h:mm A')}</TableCell>
                          <TableCell>
                            <img
                              src={flags[partido.equipo1.toLowerCase().replace(' ', '_')]}
                              alt={`Bandera de ${partido.equipo1}`}
                              style={{ width: '30px', height: '20px' }}
                            />
                          </TableCell>
                          <TableCell>
                            {partido.gol_equipo1 === -1 ? ' ' : partido.gol_equipo1} -{' '}
                            {partido.gol_equipo2 === -1 ? ' ' : partido.gol_equipo2}
                          </TableCell>
                          <TableCell>
                            <img
                              src={flags[partido.equipo2.toLowerCase().replace(' ', '_')]}
                              alt={`Bandera de ${partido.equipo2}`}
                              style={{ width: '30px', height: '20px' }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))}
          </div>
        </Grid>
        <Grid item p={1} xs={3}>
          <Typography variant="h4" style={{ color: 'black', textAlign: 'center' }} gutterBottom>
            TEAMS
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
            }}
          >
            {equipos.map((equipo, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <img
                  src={equipo.bandera}
                  alt={`Bandera de ${equipo.nombre}`}
                  style={{ width: '30px', height: '20px', marginRight: '10px' }}
                />
                <Typography variant="body1">{equipo.nombre}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Fixture;
