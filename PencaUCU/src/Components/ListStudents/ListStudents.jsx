import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { getAllStudents } from '../../services/studentService';

const ListStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchStudents() {
            const token = localStorage.getItem('token');
            if (!token) {
              console.log('No token found');
              return; 
            }
            try {              
              const students = await getAllStudents(token);              
              setStudents(students);          
            } catch (error) {
              console.error('Error fetching students:', error);
            }
        };
    
        fetchStudents();
    }, []);

    return (
        <div>
            <Typography variant="h5" style={{marginLeft:40, marginBottom: '15px' }}>Students</Typography>
            <TableContainer component={Paper} style={{marginLeft:40, maxHeight: 500 }}>
                <Table stickyHeader>
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
                                <TableCell>{student.ci}</TableCell>
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
