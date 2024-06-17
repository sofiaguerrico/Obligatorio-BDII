import React from 'react';
import Button from '@mui/material/Button';
import { Navbar, Nav } from 'react-bootstrap';
import './AdminDrawer.css';

const AdminDrawer = ({ onSelectComponent }) => {
    return (
        <div className="d-flex">
            <Navbar bg="dark" variant="dark" expand="lg" className="navAdmin flex-column">
                <Navbar.Brand>Admin</Navbar.Brand>
                <div className='navButtons'>
                    <Button fullWidth variant="text" sx={{ color: 'white' }} className="mb-2" onClick={() => onSelectComponent('Main')}>Main</Button>
                    <Button fullWidth variant="text" sx={{ color: 'white' }} className="mb-2" onClick={() => onSelectComponent('Matches')}>Matches</Button>
                    <Button fullWidth variant="text" sx={{ color: 'white' }} className="mb-2" onClick={() => onSelectComponent('Predictions')}>Predictions</Button>
                </div>
                <Button fullWidth variant="text" sx={{ color: 'white' }} className="mt-auto">Log out</Button>
            </Navbar>
        </div>
    )
}

export default AdminDrawer;
