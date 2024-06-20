import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const ListStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Simulated API call or function to fetch students
        const fetchStudents = async () => {
            // Simulated student data (replace with actual API call)
            const studentsData = [
                {
                    CI: 1234567,
                    nombre_alumno: 'John',
                    apellido_alumno: 'Doe',
                    genero_alumno: 'Male',
                    celular_alumno: 999123456,
                    correo_estudiantil: 'john@example.com',
                    campeon: 'Uruguay',
                    subcampeon: 'Argentina',
                    puntos_totales: 100
                },
                {
                    CI: 2345678,
                    nombre_alumno: 'Jane',
                    apellido_alumno: 'Smith',
                    genero_alumno: 'Female',
                    celular_alumno: 999234567,
                    correo_estudiantil: 'jane@example.com',
                    campeon: 'Uruguay',
                    subcampeon: 'Argentina',
                    puntos_totales: 85
                },
            ];

            setStudents(studentsData);
        };

        fetchStudents(); 
    }, []);

    return (
        <div>
            <Typography variant="h5" style={{ marginBottom: '15px' }}>Students</Typography>
            <TableContainer  component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>CI</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>CellPhone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Winner</TableCell>
                            <TableCell>2nd Winner</TableCell>
                            <TableCell>Total Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student, index) => (
                            <TableRow key={index}>
                                <TableCell>{student.CI}</TableCell>
                                <TableCell>{student.nombre_alumno}</TableCell>
                                <TableCell>{student.apellido_alumno}</TableCell>
                                <TableCell>{student.genero_alumno}</TableCell>
                                <TableCell>{student.celular_alumno}</TableCell>
                                <TableCell>{student.correo_estudiantil}</TableCell>
                                <TableCell>{student.campeon}</TableCell>
                                <TableCell>{student.subcampeon}</TableCell>
                                <TableCell>{student.puntos_totales}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ListStudents;
