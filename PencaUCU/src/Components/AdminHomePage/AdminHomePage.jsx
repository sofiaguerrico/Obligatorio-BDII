import React, { useState } from 'react';
import AdminDrawer from '../AdminDrawer/AdminDrawer';
import MainPageAdmin from '../MainPageAdmin/MainPageAdmin';
import MatchesAdmin from '../MatchesAdmin/MatchesAdmin';

const AdminHomePage = () => {
    const [selectedComponent, setSelectedComponent] = useState('Main');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Main':
                return <MainPageAdmin/>;
            case 'Matches':
                return <MatchesAdmin/>;
            case 'Predictions':
                return <h2>hola2</h2>;
            default:
                return null;
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <AdminDrawer onSelectComponent={setSelectedComponent} />
            <div style={{ display: 'flex-column' }}>
                {renderComponent()}
            </div>
        </div>
    );
}

export default AdminHomePage;
