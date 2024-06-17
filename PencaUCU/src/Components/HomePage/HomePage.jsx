import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import uruguay from '../../images/uruguay.png';
import argentina from '../../images/argentina.png';
import mexico from '../../images/mexico.png';
import colombia from '../../images/colombia.png';
import Carousel from 'react-bootstrap/Carousel';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Navbar from '../Navbar/Navbar';

const partidos = [
  {
    pais1: "Uruguay",
    bandera1: uruguay,
    pais2: "Argentina",
    bandera2: argentina,
    fecha: new Date().toISOString().split('T')[0],
    etapa: "Grupo"
  },
  {
    pais1: "Mexico",
    bandera1: mexico,
    pais2: "Colombia",
    bandera2: colombia,
    fecha: new Date().toISOString().split('T')[0],
    etapa: "Grupo"
  },
  {
    pais1: "Argentina",
    bandera1: argentina,
    pais2: "Mexico",
    bandera2: mexico,
    fecha: new Date().toISOString().split('T')[0],
    etapa: "Grupo"
  },
  {
    pais1: "Uruguay",
    bandera1: uruguay,
    pais2: "Colombia",
    bandera2: colombia,
    fecha: "2024-06-04",
    etapa: "Grupo"
  }
];

const HomePage = () => {
  const today = new Date().toISOString().split('T')[0]; 
  const partidosHoy = partidos.filter(partido => partido.fecha === today); 
  const navigate = useNavigate();

  const handleInsertClick = (partido) => {
    navigate('/prediction', { state: { partido } });
  };

  return (
    <div>
      <Navbar />
      <div style={{ backgroundColor: '#D9D9D9' }}>
        <Typography variant="h4" style={{ color: 'black', textAlign: 'center' }} gutterBottom>
          TODAY'S MATCHES
        </Typography>
        <Carousel>
          {partidosHoy.map((partido, index) => (
            <Carousel.Item key={index} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
                  <img src={partido.bandera1} alt={`Bandera de ${partido.pais1}`} style={{ width: '150px', height: '100px' }} />
                  <Typography variant="h6" style={{ marginTop: '10px' }}>
                    {partido.pais1}
                  </Typography>
                </div>
                <Typography variant="h4" style={{ margin: '0 20px' }}>VS</Typography>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
                  <img src={partido.bandera2} alt={`Bandera de ${partido.pais2}`} style={{ width: '150px', height: '100px' }} />
                  <Typography variant="h6" style={{ marginTop: '10px' }}>
                    {partido.pais2}
                  </Typography>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className='bodyHomePage'>
        <Container
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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
                <img src={partido.bandera1} alt={`Bandera de ${partido.pais1}`} style={{ width: '100px', height: '60px' }} />
                <Typography variant="h6" style={{ marginTop: '10px' }}>
                  {partido.pais1}
                </Typography>
              </div>
              <div>
                <Typography variant="body1" style={{ textAlign: 'center' }}>
                  {partido.fecha}
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
                <img src={partido.bandera2} alt={`Bandera de ${partido.pais2}`} style={{ width: '100px', height: '60px' }} />
                <Typography variant="h6" style={{ marginTop: '10px' }}>
                  {partido.pais2}
                </Typography>
              </div>
            </Box>
          ))}
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
