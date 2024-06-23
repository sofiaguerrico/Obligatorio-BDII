const createStudent = async (student) => {
    console.log(student)
    try {
        const response = await fetch(`http://localhost:8080/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
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

const loginStudent = async (correoEstudiantil, passwordAlumno) => {
    try {
        const response = await fetch(`http://localhost:8080/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                correo: correoEstudiantil,
                password: passwordAlumno
            })
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

const getByEmail = async (token, correo_estudiantil) => {
    try {
        const url = 'http://localhost:8080/alumno';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Correo-Estudiantil': correo_estudiantil
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
  
        const data = await response.json();      
        return data;
    } catch (error) {      
        console.error('Error obteniendo alumno por correo:', error);
        throw error;
    }
};




export { createStudent, loginStudent, getByEmail }