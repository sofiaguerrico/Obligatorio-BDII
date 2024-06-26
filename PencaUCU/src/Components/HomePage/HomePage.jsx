import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Navbar from '../Navbar/Navbar';
import { getMatches } from '../../services/play_match.js';
import { getPredictions } from '../../services/prediction.js'; 
import flags from '../flags.js';

const HomePage = () => {
  const [matches, setMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]); 
  const [predictions, setPredictions] = useState({});
  const [disabledButtons, setDisabledButtons] = useState({});
  const navigate = useNavigate();
  const correo_estudiantil = localStorage.getItem('alumno');
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchMatchesAndPredictions() {
      if (!token || !correo_estudiantil) return;

      try {
        const matchesData = await getMatches(token);
        matchesData.sort((a, b) => new Date(a.fecha_hora_partido) - new Date(b.fecha_hora_partido));

        const currentDate = new Date();
        const filteredMatches = matchesData.filter(match => new Date(match.fecha_hora_partido) >= currentDate);
        const pastMatchesData = matchesData.filter(match => new Date(match.fecha_hora_partido) < currentDate);
        
        pastMatchesData.sort((a, b) => new Date(b.fecha_hora_partido) - new Date(a.fecha_hora_partido));
        
        setMatches(filteredMatches.slice(0, 6));
        setUpcomingMatches(filteredMatches.slice(6));
        setPastMatches(pastMatchesData);

        const allPredictions = await getPredictions(token);  
        const userPredictions = {};
        const disableButtonsState = {};

        matchesData.forEach((match) => {
          const predictionKey = `${match.equipo1}-${match.equipo2}-${match.fecha_hora_partido}`;
          const userPrediction = allPredictions.find(pred =>
            pred.correo_estudiantil === correo_estudiantil &&
            pred.equipo1 === match.equipo1 &&
            pred.equipo2 === match.equipo2 &&
            pred.fecha_hora_partido === match.fecha_hora_partido
          );
          userPredictions[predictionKey] = userPrediction || null;

          const matchTime = new Date(match.fecha_hora_partido);
          const currentTime = new Date();
          
          disableButtonsState[predictionKey] = matchTime - currentTime <= 60 * 60 * 1000;
        });

        setPredictions(userPredictions);
        setDisabledButtons(disableButtonsState);
      } catch (error) {
        console.error('Error fetching matches or predictions:', error);
      }
    }

    fetchMatchesAndPredictions();
  }, [token, correo_estudiantil]);

  const handleInsertClick = (match) => {
    const predictionKey = `${match.equipo1}-${match.equipo2}-${match.fecha_hora_partido}`;
    const existingPrediction = predictions[predictionKey];
    navigate('/prediction', { state: { match, existingPrediction } });
  };

  const formatDateTime = (dateString) => {
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);

    return {
      date: date.toLocaleDateString(undefined, optionsDate),
      time: date.toLocaleTimeString(undefined, optionsTime),
    };
  };

  const renderResult = (match) => {
    const matchTime = new Date(match.fecha_hora_partido);
    const currentTime = new Date();
    
    if (currentTime >= matchTime || (match.gol_equipo1 !== -1 && match.gol_equipo2 !== -1)) {
      return (
        <Typography variant="body2" style={{ textAlign: 'center', marginTop: '10px' }}>
          {match.gol_equipo1} - {match.gol_equipo2}
        </Typography>
      );
    }

    return null;
  };

  return (
    <div>
      <Navbar />
      <div className='bodyHomePage'>
        <Container sx={{ marginTop: '20px' }}>
          <Typography variant="h4" style={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}>
            MATCHES
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {matches.map((match, index) => {
              const { date, time } = formatDateTime(match.fecha_hora_partido);
              const predictionKey = `${match.equipo1}-${match.equipo2}-${match.fecha_hora_partido}`;
              return (
                <Box
                  key={index}
                  width={300}
                  p={2}
                  sx={{ borderRadius: 1, backgroundColor: '#D9D9D9', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', mb: 2 }}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '10px' }}>
                    {date}
                  </Typography>
                  <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '10px' }}>
                    {time}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <img src={flags[match.equipo1.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${match.equipo1}`} style={{ width: '60px', height: '40px' }} />
                      <Typography variant="h6" style={{ marginTop: '10px' }}>
                        {match.equipo1}
                      </Typography>
                      {renderResult(match)}
                    </div>
                    <div>
                      {renderResult(match) ? null : (
                        <Button
                          variant="contained"
                          style={{ margin: '0 10px', backgroundColor: '#070512' }}
                          onClick={() => handleInsertClick(match)}
                          disabled={disabledButtons[predictionKey]}
                        >
                          {predictions[predictionKey] ? 'Change' : 'Insert'}
                        </Button>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <img src={flags[match.equipo2.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${match.equipo2}`} style={{ width: '60px', height: '40px' }} />
                      <Typography variant="h6" style={{ marginTop: '10px' }}>
                        {match.equipo2}
                      </Typography>
                      {renderResult(match)}
                    </div>
                  </Box>
                  <Typography variant="body2" style={{ textAlign: 'center', marginTop: '10px' }}>
                    {match.estadio}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Typography variant="h4" style={{ color: 'black', textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
            Upcoming Matches
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {upcomingMatches.map((match, index) => {
              const { date, time } = formatDateTime(match.fecha_hora_partido);
              const predictionKey = `${match.equipo1}-${match.equipo2}-${match.fecha_hora_partido}`;
              return (
                <Box
                  key={index}
                  width={300}
                  p={2}
                  sx={{ borderRadius: 1, backgroundColor: '#D9D9D9', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', mb: 2 }}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '10px' }}>
                    {date}
                  </Typography>
                  <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '10px' }}>
                    {time}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <img src={flags[match.equipo1.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${match.equipo1}`} style={{ width: '60px', height: '40px' }} />
                      <Typography variant="h6" style={{ marginTop: '10px' }}>
                        {match.equipo1}
                      </Typography>
                      {renderResult(match)}
                    </div>
                    <div>
                      {renderResult(match) ? null : (
                        <Button
                          variant="contained"
                          style={{ margin: '0 10px', backgroundColor: '#070512' }}
                          onClick={() => handleInsertClick(match)}
                          disabled={disabledButtons[predictionKey]}
                        >
                          {predictions[predictionKey] ? 'Change' : 'Insert'}
                        </Button>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <img src={flags[match.equipo2.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${match.equipo2}`} style={{ width: '60px', height: '40px' }} />
                      <Typography variant="h6" style={{ marginTop: '10px' }}>
                        {match.equipo2}
                      </Typography>
                      {renderResult(match)}
                    </div>
                  </Box>
                  <Typography variant="body2" style={{ textAlign: 'center', marginTop: '10px' }}>
                    {match.estadio}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* Sección para los partidos pasados */}
          <Typography variant="h4" style={{ color: 'black', textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
            Past Matches
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {pastMatches.map((match, index) => {
              const { date, time } = formatDateTime(match.fecha_hora_partido);
              const predictionKey = `${match.equipo1}-${match.equipo2}-${match.fecha_hora_partido}`;
              return (
                <Box
                  key={index}
                  width={300}
                  p={2}
                  sx={{ borderRadius: 1, backgroundColor: '#D9D9D9', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', mb: 2 }}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '10px' }}>
                    {date}
                  </Typography>
                  <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '10px' }}>
                    {time}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <img src={flags[match.equipo1.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${match.equipo1}`} style={{ width: '60px', height: '40px' }} />
                      <Typography variant="h6" style={{ marginTop: '10px' }}>
                        {match.equipo1}
                      </Typography>
                      {match.gol_equipo1}
                    </div>
                    <div>
                      {renderResult(match) ? null : (
                        <Button
                          variant="contained"
                          style={{ margin: '0 10px', backgroundColor: '#070512' }}
                          onClick={() => handleInsertClick(match)}
                          disabled={disabledButtons[predictionKey]}
                        >
                          {predictions[predictionKey] ? 'Change' : 'Insert'}
                        </Button>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <img src={flags[match.equipo2.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${match.equipo2}`} style={{ width: '60px', height: '40px' }} />
                      <Typography variant="h6" style={{ marginTop: '10px' }}>
                        {match.equipo2}
                      </Typography>
                      {match.gol_equipo2}
                    </div>
                  </Box>
                  <Typography variant="body2" style={{ textAlign: 'center', marginTop: '10px' }}>
                    {match.estadio}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
