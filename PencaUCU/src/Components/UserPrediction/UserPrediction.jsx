import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import { getPredictions } from '../../services/prediction';
import flags from '../flags';
import { useNavigate } from 'react-router-dom';
import { getMatches } from '../../services/play_match';

const UserPrediction = () => {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState('');
  const [matches, setMatches] = useState([]);
  const correo_estudiantil = localStorage.getItem('alumno');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!token || !correo_estudiantil) return;

      try {
        const predictionsData = await getPredictions(token);
        const filteredPredictions = predictionsData.filter(prediction => prediction.correo_estudiantil === correo_estudiantil);
        setPredictions(filteredPredictions);
        const allMatches = await getMatches(token);
        setMatches(allMatches);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    }
    fetchData();
  }, [token, correo_estudiantil]);

  const handleEditPrediction = (prediction) => {
    const match = matches.find(match =>
      match.equipo1 === prediction.equipo1 &&
      match.equipo2 === prediction.equipo2 &&
      match.fecha_hora_partido === prediction.fecha_hora_partido
    );

    navigate('/prediction', { state: { existingPrediction: prediction, match } });
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

  const calculatePoints = (prediction, match) => {
    if (!match) return 0;
    console.log("prediccion",prediction)
    console.log("match", match)
    const matchTime = new Date(match.fecha_hora_partido);
    const currentTime = new Date();
    let totalPoints = 0;
    if (currentTime >= matchTime || match.gol_equipo1!==-1) {
      if (prediction.gol_equipo1 === match.gol_equipo1 && prediction.gol_equipo2 === match.gol_equipo2) {
        totalPoints = 4;
      } else
        if (prediction.gol_equipo1> prediction.gol_equipo2 && match.gol_equipo1> match.gol_equipo2) {
          totalPoints = 2;
        }
    }

    return totalPoints;
  };


  return (
    <div>
      <Navbar />
      <div className='bodyHomePage'>
        <Container sx={{ marginTop: '20px' }}>
          <Typography variant="h4" style={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}>
            Your Predictions
          </Typography>
          {error && <p>Error: {error}</p>}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" style={{ color: 'black', textAlign: 'center', marginBottom: '10px' }}>
              Predicciones vigentes
            </Typography>
            {predictions.map((prediction, index) => {
              const { date, time } = formatDateTime(prediction.fecha_hora_partido);

              const match = matches.find(match =>
                match.equipo1 === prediction.equipo1 &&
                match.equipo2 === prediction.equipo2 &&
                match.fecha_hora_partido === prediction.fecha_hora_partido
              );

              if (!match || calculatePoints(prediction, match) >=0) return null;

              const predictionKey = `${prediction.equipo1}-${prediction.equipo2}-${prediction.fecha_hora_partido}`;

              const disableEdit = () => {
                const matchTime = new Date(match.fecha_hora_partido);
                const currentTime = new Date();
                return matchTime - currentTime <= 60 * 60 * 1000;
              };

              return (
                <Box
                  key={index}
                  width={500}
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
                      <img src={flags[prediction.equipo1.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${prediction.equipo1}`} style={{ width: '60px', height: '40px' }} />
                      <Typography variant="h6" style={{ marginTop: '10px' }}>
                        {prediction.equipo1}
                      </Typography>
                      <Typography variant="body2" style={{ marginTop: '5px' }}>
                        {prediction.gol_equipo1}
                      </Typography>
                    </div>
                    <Button
                      variant="contained"
                      style={{ margin: '0 10px', backgroundColor: '#070512' }}
                      onClick={() => handleEditPrediction(prediction)}
                      disabled={disableEdit()}
                    >
                      Edit
                    </Button>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <img src={flags[prediction.equipo2.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${prediction.equipo2}`} style={{ width: '60px', height: '40px' }} />
                      <Typography variant="h6" style={{ marginTop: '10px' }}>
                        {prediction.equipo2}
                      </Typography>
                      <Typography variant="body2" style={{ marginTop: '5px' }}>
                        {prediction.gol_equipo2}
                      </Typography>
                    </div>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            <Typography variant="h5" style={{ color: 'black', textAlign: 'center', marginBottom: '10px' }}>
              Predicciones terminadas
            </Typography>
            {predictions.map((prediction, index) => {
              const { date, time } = formatDateTime(prediction.fecha_hora_partido);

              const match = matches.find(match =>
                match.equipo1 === prediction.equipo1 &&
                match.equipo2 === prediction.equipo2 &&
                match.fecha_hora_partido === prediction.fecha_hora_partido
              );

              if (!match ) return null;

              const predictionKey = `${prediction.equipo1}-${prediction.equipo2}-${prediction.fecha_hora_partido}`;

              return (
                <Box
                  key={index}
                  width={500}
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
                      <img src={flags[prediction.equipo1.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${prediction.equipo1}`} style={{ width: '60px', height: '40px' }} />
                      <Typography variant="h6" style={{ marginTop: '10px' }}>
                        {prediction.equipo1}
                      </Typography>
                      <Typography variant="body2" style={{ marginTop: '5px' }}>
                        {prediction.gol_equipo1}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" style={{ marginTop: '5px', fontWeight: 'bold' }}>
                        Puntos: {calculatePoints(prediction, match)}
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <img src={flags[prediction.equipo2.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${prediction.equipo2}`} style={{ width: '60px', height: '40px' }} />
                      <Typography variant="h6" style={{ marginTop: '10px' }}>
                        {prediction.equipo2}
                      </Typography>
                      <Typography variant="body2" style={{ marginTop: '5px' }}>
                        {prediction.gol_equipo2}
                      </Typography>
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

export default UserPrediction;
