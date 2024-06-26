const getMatches = async (token) => {
    try {        
        const response = await fetch(`http://localhost:8080/playmatch/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();        
        return data;
    } catch (error) {        
        console.error('Error fetching matches:', error);        
        throw error;
    }
};

const insertMatch = async (token, match) => {
    try {
        const response = await fetch('http://localhost:8080/playmatch/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(match)
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return response;
    } catch (error) {        
        console.error('Error inserting match:', error);
        throw error;
    }
};

// Obtener fixture por etapa del torneo
const getFixtureStage = async (token, stage) => {
    try {
        const response = await fetch('http://localhost:8080/playmatch/fixture/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'stage': stage
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {        
        console.error('Error fetching matches:', error);
        throw error;
    }
};


const getMatch = async (token, equipo1, equipo2, fecha_hora_partido) => {
    try {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('equipo1', equipo1);
        headers.append('equipo2', equipo2);
        headers.append('fecha_hora_partido', fecha_hora_partido);

        const requestOptions = {
            method: 'GET',
            headers: headers,
            credentials: 'include'
        };

        const response = await fetch(`http://localhost:8080/admin/playmatch/find/`, requestOptions);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {        
        console.error('Error:', error);
        throw error;
    }
};

const modifyMatch = async (token, match) => {
    try {
        const response = await fetch('http://localhost:8080/playmatch/fixture/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(match)
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.error('Error inserting prediction:', error);
        throw error;
    }
}


const resultMatch = async (token, match) => {
    try {
        const response = await fetch('http://localhost:8080/playmatch/modify/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(match)
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return response;
    } catch (error) {        
        console.error('Error inserting match:', error);
        throw error;
    }
};

export { getMatches, insertMatch, getFixtureStage, getMatch, modifyMatch, resultMatch };