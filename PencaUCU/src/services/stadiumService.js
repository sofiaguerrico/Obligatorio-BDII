const fetchAllStadiums = async () => {
    try {
        const response = await fetch(`http://localhost:8080/stadium/`);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export { fetchAllStadiums }