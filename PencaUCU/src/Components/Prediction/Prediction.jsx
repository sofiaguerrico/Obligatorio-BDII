import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import uruguay from '../../images/uruguay.png';
import argentina from '../../images/argentina.png';
import mexico from '../../images/mexico.png';
import colombia from '../../images/colombia.png';
import Navbar from '../Navbar/Navbar';
import './Prediction.css';

const images = {
    uruguay,
    argentina,
    mexico,
    colombia,
};

const Prediction = () => {
    const location = useLocation();
    const { partido } = location.state;
    const [score1, setScore1] = useState('');
    const [score2, setScore2] = useState('');

    const handleSubmit = () => {
        console.log(`Prediction: ${partido.pais1} ${score1} - ${score2} ${partido.pais2} ${partido.fecha}`);
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
            <Container
                maxWidth="md"
                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <Box mt={2}>
                    <Typography variant="h4" gutterBottom style={{ color: '#070512' }}>
                        INSERT PREDICTION
                    </Typography>
                </Box>
                <Box
                    width={700}
                    alignItems="center"
                    p={2}
                    sx={{ borderRadius: 1, backgroundColor: '#070512', padding: '50px' }}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">

                        <Grid item container justifyContent="center" alignItems="center" spacing={2}>
                            <Grid item container direction="column" alignItems="center" xs={4}>
                                <img src={images[partido.pais1.toLowerCase()]} alt={`Bandera de ${partido.pais1}`} style={{ width: '150px', height: '100px' }} />
                                <Typography variant="h6" style={{ color: 'white' }}>{partido.pais1}</Typography>
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
                                <img src={images[partido.pais2.toLowerCase()]} alt={`Bandera de ${partido.pais2}`} style={{ width: '150px', height: '100px' }} />
                                <Typography variant="h6" style={{ color: 'white' }}>{partido.pais2}</Typography>
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
                    <Button variant="contained" onClick={handleSubmit} style={{ background: '#070512' }}>
                        Insert
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

export default Prediction;
