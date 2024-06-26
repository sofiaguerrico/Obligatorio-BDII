import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import flags from '../flags.js';
import { resultMatch } from '../../services/play_match.js';

const EnterResult = ({ partido }) => {
    const [score1, setScore1] = useState('');
    const [score2, setScore2] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError('');

        const matchResult = {
            equipo1: partido.equipo1,
            equipo2: partido.equipo2,
            fecha_hora_partido: partido.fecha_hora_partido,
            etapa: partido.etapa,
            gol_equipo1: parseInt(score1, 10),
            gol_equipo2: parseInt(score2, 10),
            ID_estadio: partido.ID_estadio
        };

        try {
            await resultMatch(token, matchResult);
            console.log('Match result submitted:', matchResult);
            window.location.reload();
        } catch (err) {
            window.location.reload();
            console.error('Error submitting match result:', err);
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
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" ml={35}>
            <Box width={600} p={4} sx={{ borderRadius: 1, backgroundColor: '#070512' }}>
                <Box mb={4}>
                    <Typography variant="h4" gutterBottom style={{ color: '#ffffff', textAlign: 'center' }}>
                        Enter Match Result for {partido.equipo1} vs {partido.equipo2}
                    </Typography>
                </Box>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={4} container direction="column" alignItems="center">
                        <img src={flags[partido.equipo1.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${partido.equipo1}`} style={{ width: '150px', height: '100px' }} />
                        <Typography variant="h6" style={{ color: 'white' }}>{partido.equipo1}</Typography>
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
                    <Grid item xs={4} container justifyContent="center" alignItems="center">
                        <Typography variant="h4" style={{ color: 'white' }}>-</Typography>
                    </Grid>
                    <Grid item xs={4} container direction="column" alignItems="center">
                        <img src={flags[partido.equipo2.toLowerCase().replace(' ', '_')]} alt={`Bandera de ${partido.equipo2}`} style={{ width: '150px', height: '100px' }} />
                        <Typography variant="h6" style={{ color: 'white' }}>{partido.equipo2}</Typography>
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
                <Box mt={2} display="flex" justifyContent="center">
                    {error && <Typography variant="body2" color="error">{error}</Typography>}
                    <Button variant="contained" onClick={handleSubmit} style={{ background: '#070512', color: 'white' }}>
                        Insert
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EnterResult;
