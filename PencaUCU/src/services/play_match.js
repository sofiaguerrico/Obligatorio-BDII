const getMatches = async (token) => {
    try {
        const response = await fetch(`http://localhost:8080/playmatch/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }            
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }        
        return await response.json();
    } catch (error) {
        console.error('error', error);
        throw error;
    }
};

export { getMatches }
