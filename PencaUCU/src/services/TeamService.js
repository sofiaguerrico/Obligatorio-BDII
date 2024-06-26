const getTeams= async () => {
    try {
        const response = await fetch('http://localhost:8080/getTeams', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
      });
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
  
      const data = await response.json();      
      return data;
    } catch (error) {      
      console.error('Error inserting prediction:', error);
      throw error;
    }
};

export { getTeams };