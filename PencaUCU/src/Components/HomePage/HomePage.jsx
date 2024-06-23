import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Navbar from '../Navbar/Navbar';
import { getMatches } from '../../services/play_match.js';
import flags from '../flags.js';

const HomePage = () => {
  const [partidos, setPartidos] = useState([]);
  const navigate = useNavigate();

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

  const handleInsertClick = (partido) => {
    navigate('/prediction', { state: { partido } });
  };



  return (
    <div>
      <Navbar />
      <div className='bodyHomePage'>
        <Container
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
        >
          <div style={{ flex: 1 }}>
            <Typography variant="h4" style={{ color: 'black', textAlign: 'center' }} gutterBottom>
              MATCHES
            </Typography>
            {partidos.map((partido, index) => (
              <Box
                key={index}
                width={500}
                alignItems="center"
                p={3}
                sx={{ borderRadius: 1, backgroundColor: '#D9D9D9', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', mb: 2 }}
                display="flex"
                justifyContent="space-between"
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={flags[partido.equipo1.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${partido.equipo1}`} style={{ width: '100px', height: '60px' }} />
                  <Typography variant="h6" style={{ marginTop: '10px' }}>
                    {partido.equipo1}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body1" style={{ textAlign: 'center' }}>
                    {partido.fecha_hora_partido}
                  </Typography>
                  <Button
                    variant="contained"
                    style={{ marginTop: '10px', backgroundColor: '#070512' }}
                    onClick={() => handleInsertClick(partido)}
                  >
                    Insert
                  </Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={flags[partido.equipo2.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${partido.equipo2}`} style={{ width: '100px', height: '60px' }} />
                  <Typography variant="h6" style={{ marginTop: '10px' }}>
                    {partido.equipo2}
                  </Typography>
                </div>
              </Box>
            ))}
          </div>
          
        </Container>
      </div>
    </div>
  );
};


/**
 

<div style={{ backgroundColor: '#D9D9D9' }}>
        <Typography variant="h4" style={{ color: 'black', textAlign: 'center' }} gutterBottom>
          TODAY'S MATCHES
        </Typography>
        <Carousel>
          {partidosHoy.map((partido, index) => (
            <Carousel.Item key={index} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
                  <img src={flags[partido.equipo1.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${partido.equipo1}`} style={{ width: '150px', height: '100px' }} />
                  <Typography variant="h6" style={{ marginTop: '10px' }}>
                    {partido.equipo1}
                  </Typography>
                </div>
                <Typography variant="h4" style={{ margin: '0 20px' }}>VS</Typography>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
                  <img src={flags[partido.equipo2.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${partido.equipo2}`} style={{ width: '150px', height: '100px' }} />
                  <Typography variant="h6" style={{ marginTop: '10px' }}>
                    {partido.equipo2}
                  </Typography>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
 */
export default HomePage;
