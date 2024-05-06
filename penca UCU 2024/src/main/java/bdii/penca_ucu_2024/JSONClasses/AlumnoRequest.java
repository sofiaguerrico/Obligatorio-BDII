package bdii.penca_ucu_2024.JSONClasses;

import bdii.penca_ucu_2024.Classes.Alumno;

public class AlumnoRequest {
    public Alumno alumni;
    public String password;

    public Alumno getAlumni() {
        return this.alumni;
    }

    public void setAlumni(Alumno alumni) {
        this.alumni = alumni;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
