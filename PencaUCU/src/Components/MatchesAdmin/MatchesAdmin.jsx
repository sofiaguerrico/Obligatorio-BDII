import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import flags from '../flags.js'; 
import './MatchesAdmin.css';

const etapas = ["Fase de grupo", "Cuartos de final", "Semifinal", "3° puesto y Final"];

const MatchesAdmin = () => {
    const [formData, setFormData] = useState({
        pais1: '',
        pais2: '',
        fecha: '',
        etapa: '',
        gol_equipo1: '',
        gol_equipo2: ''
    });

    const [partidos, setPartidos] = useState([
        {
            pais1: "Uruguay",
            bandera1: flags.uruguay,
            pais2: "Argentina",
            bandera2: flags.argentina,
            fecha: new Date().toISOString().split('T')[0],
            etapa: "Fase de grupo",
            gol_equipo1: '3',
            gol_equipo2: '0'
        },
        {
            pais1: "Mexico",
            bandera1: flags.mexico,
            pais2: "Colombia",
            bandera2: flags.colombia,
            fecha: new Date().toISOString().split('T')[0],
            etapa: "Fase de grupo",
            gol_equipo1: '1',
            gol_equipo2: '3'
        },
        {
            pais1: "Argentina",
            bandera1: flags.argentina,
            pais2: "Mexico",
            bandera2: flags.mexico,
            fecha: new Date().toISOString().split('T')[0],
            etapa: "Cuartos de final",
            gol_equipo1: '2',
            gol_equipo2: '2'
        },
        {
            pais1: "Uruguay",
            bandera1: flags.uruguay,
            pais2: "Colombia",
            bandera2: flags.colombia,
            fecha: "2024-06-04",
            etapa: "Semifinal",
            gol_equipo1: '4',
            gol_equipo2: '1'
        }
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPartido = { ...formData };
        setPartidos([...partidos, newPartido]);
        setFormData({
            pais1: '',
            pais2: '',
            fecha: '',
            etapa: '',
            gol_equipo1: '',
            gol_equipo2: ''
        });
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
                                        <img src={partido.bandera1} alt={`Bandera de ${partido.pais1}`} style={{ width: '100px', height: '60px' }} />
                                        <Typography variant="h6" style={{ marginTop: '10px' }}>
                                            {partido.pais1}
                                        </Typography>
                                        <Typography variant="body1" style={{ marginTop: '5px' }}>
                                            {partido.gol_equipo1}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="body1" style={{ textAlign: 'center' }}>
                                            {partido.fecha}
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={partido.bandera2} alt={`Bandera de ${partido.pais2}`} style={{ width: '100px', height: '60px' }} />
                                        <Typography variant="h6" style={{ marginTop: '10px' }}>
                                            {partido.pais2}
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
                <Box width="50%"  p={2}>
                    <form className="formMatches" onSubmit={handleSubmit}>
                        <Typography align="center" variant="h4">Agregar Partido</Typography>
                        <TextField
                            name="pais1"
                            label="País 1"
                            value={formData.pais1}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="pais2"
                            label="País 2"
                            value={formData.pais2}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="fecha"
                            label="Fecha"
                            type="date"
                            value={formData.fecha}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Select
                            name="etapa"
                            value={formData.etapa}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        >
                            {etapas.map((etapa, index) => (
                                <MenuItem key={index} value={etapa}>{etapa}</MenuItem>
                            ))}
                        </Select>
                        <TextField
                            name="gol_equipo1"
                            label="Gol Equipo 1"
                            value={formData.gol_equipo1}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="gol_equipo2"
                            label="Gol Equipo 2"
                            value={formData.gol_equipo2}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" fullWidth sx={{color: 'white',background: '#070512','&:hover': { background: '#0e0a22', }}}variant="contained">Agregar</Button>

                    </form>
                </Box>
            </Box>
        </Container>
    );
}

export default MatchesAdmin;
