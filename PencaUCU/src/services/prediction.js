const getPredictions = async (token) => {
    try {
        const response = await fetch('http://localhost:8080/prediction/', {
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
      console.error('Error inserting prediction:', error);
      throw error;
    }
};

const insertPrediction = async (token, prediction) => {
    try {
      const response = await fetch('http://localhost:8080/prediction/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(prediction)
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

  const modifyPrediction = async (token, prediction) => {
    try {
        const response = await fetch('http://localhost:8080/prediction/modify/', {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              credentials: 'include',
              body: JSON.stringify(prediction)
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


  const getPredictionUser = async (token, correo_estudiantil, equipo1, equipo2, fecha_hora_partido) => {
    try {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('correo_estudiantil', correo_estudiantil);
        headers.append('equipo1', equipo1);
        headers.append('equipo2', equipo2);
        headers.append('fecha_hora_partido', fecha_hora_partido);

        const requestOptions = {
            method: 'GET',
            headers: headers,
            credentials: 'include'
        };

        const response = await fetch(`http://localhost:8080/prediction/user/`, requestOptions);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {        
        console.error('Error:', error);
        throw error;
    }
  }
  
  export { getPredictions, insertPrediction, modifyPrediction, getPredictionUser };