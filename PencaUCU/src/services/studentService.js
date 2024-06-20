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



export { createStudent, loginStudent }