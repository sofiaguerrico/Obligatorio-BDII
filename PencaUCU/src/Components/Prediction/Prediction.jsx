import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Navbar from '../Navbar/Navbar';
import './Prediction.css';
import { insertPrediction, modifyPrediction } from '../../services/prediction';
import flags from '../flags.js';

const Prediction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { match, existingPrediction } = location.state;
  const [score1, setScore1] = useState(existingPrediction ? existingPrediction.gol_equipo1 : '');
  const [score2, setScore2] = useState(existingPrediction ? existingPrediction.gol_equipo2 : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/'); 
    }
  }, [navigate, token]);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    const predictionData = {
      correo_estudiantil: localStorage.getItem('alumno'),
      equipo1: match.equipo1,
      equipo2: match.equipo2,
      fecha_hora_partido: match.fecha_hora_partido,
      gol_equipo1: parseInt(score1, 10),
      gol_equipo2: parseInt(score2, 10),
    };

    try {
      if (existingPrediction) {
        console.log('acaaaaaaaaaaa')
        console.log(predictionData)
        await modifyPrediction(token, predictionData);

      } else {
        await insertPrediction(token, predictionData);
      }
      navigate('/homePage');
    } catch (err) {
      console.error('Error inserting or modifying prediction:', err);
      setError('Failed to insert or modify prediction');
    } finally {
      setLoading(false);
    }
  };

  const textFieldStyle = {
    '& .MuiInputBase-input': {
      color: '#ffffff',
    },
    '& .MuiInputLabel-root': {
      color: '#ffffff',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#ffffff',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ffffff',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: '#ffffff',
    },
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <Box mt={2}>
          <Typography variant="h4" gutterBottom style={{ color: '#070512' }}>
            {existingPrediction ? 'CHANGE PREDICTION' : 'INSERT PREDICTION'}
          </Typography>
        </Box>
        <Box width={700} alignItems="center" p={2} sx={{ borderRadius: 1, backgroundColor: '#070512', padding: '50px' }}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item container justifyContent="center" alignItems="center" spacing={2}>
              <Grid item container direction="column" alignItems="center" xs={4}>
                <img src={flags[match.equipo1.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${match.equipo1}`} style={{ width: '150px', height: '100px' }} />
                <Typography variant="h6" style={{ color: 'white' }}>{match.equipo1}</Typography>
                <TextField
                  sx={textFieldStyle}
                  label="Score"
                  variant="standard"
                  value={score1}
                  type="number"
                  onChange={(e) => setScore1(e.target.value)}
                  style={{ marginTop: '10px' }}
                />
              </Grid>
              <Grid item xs={4} container direction="column" alignItems="center">
                <Typography variant="h4" style={{ color: 'white' }}>-</Typography>
              </Grid>
              <Grid item container direction="column" alignItems="center" xs={4}>
                <img src={flags[match.equipo2.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${match.equipo2}`} style={{ width: '150px', height: '100px' }} />
                <Typography variant="h6" style={{ color: 'white' }}>{match.equipo2}</Typography>
                <TextField
                  sx={textFieldStyle}
                  label="Score"
                  variant="standard"
                  value={score2}
                  type="number"
                  onChange={(e) => setScore2(e.target.value)}
                  style={{ marginTop: '10px' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box mt={2}>
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          <Button variant="contained" onClick={handleSubmit} style={{ background: '#070512' }} disabled={loading}>
            {loading ? 'Inserting...' : existingPrediction ? 'Change' : 'Insert'}
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Prediction;
