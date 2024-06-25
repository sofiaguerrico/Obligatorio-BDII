const isAdmin = async (token) => {
    try {        
        const response = await fetch('http://localhost:8080/isadmin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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

export { isAdmin };