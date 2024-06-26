const fetchAllCareer = async () => {
    try {
        const response = await fetch(`http://localhost:8080/careers`);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

const setStudies = async (studyData) => {
  try {
    const response = await fetch(`http://localhost:8080/setStudies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studyData),
    });

    if (!response.ok) {
      throw new Error('Failed to set studies');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export { fetchAllCareer, setStudies }