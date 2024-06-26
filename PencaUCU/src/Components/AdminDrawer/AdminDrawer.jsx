import React from 'react';
import Button from '@mui/material/Button';
import { Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import './AdminDrawer.css';

const AdminDrawer = ({ onSelectComponent }) => {
    const navigate = useNavigate(); 

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('alumno');
        navigate('/'); 
    };

    return (
        <div className="d-flex">
            <Navbar style={{ background: '#070512' }} variant="dark" expand="lg" className="navAdmin flex-column">
                <Navbar.Brand>Admin</Navbar.Brand>
                <div className='navButtons'>
                    <Button fullWidth variant="text" sx={{ color: 'white' }} className="mb-2" onClick={() => onSelectComponent('Main')}>Main</Button>
                    <Button fullWidth variant="text" sx={{ color: 'white' }} className="mb-2" onClick={() => onSelectComponent('Matches')}>Matches</Button>
                    <Button fullWidth variant="text" sx={{ color: 'white' }} className="mb-2" onClick={() => onSelectComponent('Predictions')}>Predictions</Button>
                    <Button fullWidth variant="text" sx={{ color: 'white' }} className="mb-2" onClick={() => onSelectComponent('Students')}>Students</Button>
                </div>
                <Button fullWidth variant="text" sx={{ color: 'white' }} className="mt-auto" onClick={handleLogout}>Log out</Button>
            </Navbar>
        </div>
    );
};

export default AdminDrawer;
