import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import flags from '../flags.js';
import './MatchesAdmin.css';
import { getTeams } from '../../services/TeamService.js';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { insertMatch, getMatches } from '../../services/play_match.js';

const etapas = ["Fase de grupo", "Cuartos de final", "Semifinal", "3° puesto y Final"];

const MatchesAdmin = () => {
    const [formData, setFormData] = useState({
        equipo1: '',
        equipo2: '',
        fecha_hora_partido: null,
        etapa: '',
        gol_equipo1: 0, 
        gol_equipo2: 0,
        id_estadio: 1  
    });

    const [partidos, setPartidos] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTeams() {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found');
                return;
            }
            try {
                const data = await getTeams(token);
                setEquipos(data);
            } catch (error) {
                console.error('Error fetching teams:', error);
                setError('Error al cargar los equipos');
            }
        }

        fetchTeams();
    }, []);

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
            } catch (error) {
                console.error('Error fetching matches:', error);
                setError('Error al cargar los partidos');
            }
        }

        fetchMatches();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedDate = formData.fecha_hora_partido ? formData.fecha_hora_partido.toISOString().slice(0, 19).replace('T', ' ') : null;

        const partidoExistente = partidos.some(partido =>
            partido.equipo1 === formData.equipo1 &&
            partido.equipo2 === formData.equipo2 &&
            partido.fecha_hora_partido === formattedDate &&
            partido.etapa === formData.etapa
        );

        if (partidoExistente) {
            alert('Ya existe un partido con las mismas características.');
            return;
        }

        const newPartido = {
            equipo1: formData.equipo1,
            equipo2: formData.equipo2,
            fecha_hora_partido: formattedDate,
            etapa: formData.etapa,
            gol_equipo1: parseInt(formData.gol_equipo1), 
            gol_equipo2: parseInt(formData.gol_equipo2), 
            id_estadio: 1 
        };

        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found');
            return;
        }

        try {
            console.log(newPartido)
            await insertMatch(token, newPartido);
            const updatedMatches = await getMatches(token);
            setPartidos(updatedMatches);
            setFormData({
                equipo1: '',
                equipo2: '',
                fecha_hora_partido: null,
                etapa: '',
                gol_equipo1: 0, 
                gol_equipo2: 0, 
                id_estadio: 1 
            });
        } catch (error) {
            console.error('Error inserting match:', error);
            setError('Error al insertar el partido');
        }
    };

    const partidosPorEtapa = partidos.reduce((acc, partido) => {
        if (!acc[partido.etapa]) {
            acc[partido.etapa] = [];
        }
        acc[partido.etapa].push(partido);
        return acc;
    }, {});

    return (
        <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center' }}>
            <Box display="flex" justifyContent="center" alignItems="flex-start" width="100%">
                <Box width="50%" className='partidos' p={2}>
                    {Object.entries(partidosPorEtapa).map(([etapa, partidosEtapa]) => (
                        <div key={etapa}>
                            <Typography variant="h4">{etapa}</Typography>
                            {partidosEtapa.map((partido, index) => (
                                <Box
                                    key={index}
                                    width="100%"
                                    alignItems="center"
                                    p={3}
                                    sx={{ borderRadius: 1, backgroundColor: '#D9D9D9', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', mb: 2 }}
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={flags[partido.equipo1.toLowerCase()]} alt={`Bandera de ${partido.equipo1}`} style={{ width: '100px', height: '60px' }} />
                                        <Typography variant="h6" style={{ marginTop: '10px' }}>
                                            {partido.equipo1}
                                        </Typography>
                                        <Typography variant="body1" style={{ marginTop: '5px' }}>
                                            {partido.gol_equipo1}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="body1" style={{ textAlign: 'center' }}>
                                            {partido.fecha_hora_partido}
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={flags[partido.equipo2.toLowerCase()]} alt={`Bandera de ${partido.equipo2}`} style={{ width: '100px', height: '60px' }} />
                                        <Typography variant="h6" style={{ marginTop: '10px' }}>
                                            {partido.equipo2}
                                        </Typography>
                                        <Typography variant="body1" style={{ marginTop: '5px' }}>
                                            {partido.gol_equipo2}
                                        </Typography>
                                    </div>
                                </Box>
                            ))}
                        </div>
                    ))}
                </Box>
                <Box width="50%" p={2}>
                    <form className="formMatches" onSubmit={handleSubmit}>
                        <Typography align="center" variant="h4">Agregar Partido</Typography>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Equipo 1</InputLabel>
                            <Select
                                name="equipo1"
                                value={formData.equipo1}
                                onChange={handleChange}
                                fullWidth
                            >
                                {equipos.map((equipo, index) => (
                                    <MenuItem key={index} value={equipo.nombre_equipo}>{equipo.nombre_equipo}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Equipo 2</InputLabel>
                            <Select
                                name="equipo2"
                                value={formData.equipo2}
                                onChange={handleChange}
                                fullWidth
                            >
                                {equipos.map((equipo, index) => (
                                    <MenuItem key={index} value={equipo.nombre_equipo}>{equipo.nombre_equipo}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Fecha y Hora"
                                value={formData.fecha_hora_partido}
                                onChange={(newValue) => setFormData({ ...formData, fecha_hora_partido: newValue })}
                                renderInput={(props) => <TextField {...props} fullWidth margin="normal" />}
                                fullWidth
                            />
                        </LocalizationProvider>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Etapa</InputLabel>
                            <Select
                                name="etapa"
                                value={formData.etapa}
                                onChange={handleChange}
                                fullWidth
                            >
                                {etapas.map((etapa, index) => (
                                    <MenuItem key={index} value={etapa}>{etapa}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            name="gol_equipo1"
                            label="Goles Equipo 1"
                            type="number"
                            value={formData.gol_equipo1}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="gol_equipo2"
                            label="Goles Equipo 2"
                            type="number"
                            value={formData.gol_equipo2}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            sx={{ color: 'white', background: '#070512', '&:hover': { background: '#0e0a22' } }}
                            variant="contained"
                        >
                            Agregar
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>
    );
}

export default MatchesAdmin;
