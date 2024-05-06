package bdii.penca_ucu_2024.Classes;

public class Alumno {

    int CI;
    String nombre_alumno;
    String apellido_alumno;
    String genero_alumno;
    int celular_alumno;
    String carrera;
    String correo_estudiantil;
    String campeon;
    String subcampeon;


    public void setCI(int CI) {
        this.CI = CI;
    }

    public void setNombre_alumno(String nombre_alumno) {
        this.nombre_alumno = nombre_alumno;
    }

    public void setApellido_alumno(String apellido_alumno) {
        this.apellido_alumno = apellido_alumno;
    }

    public void setGenero_alumno(String genero_alumno) {
        this.genero_alumno = genero_alumno;
    }

    public void setCelular_alumno(int celular_alumno) {
        this.celular_alumno = celular_alumno;
    }

    public void setCarrera(String carrera) {
        this.carrera = carrera;
    }

    public void setCorreo_estudiantil(String correo_estudiantil) {
        this.correo_estudiantil = correo_estudiantil;
    }

    public void setCampeon(String campeon) {
        this.campeon = campeon;
    }

    public void setSubcampeon(String subcampeon) {
        this.subcampeon = subcampeon;
    }

    public int getCI() {return CI;}

    public String getNombre_alumno() {
        return nombre_alumno;
    }

    public String getApellido_alumno() {
        return apellido_alumno;
    }

    public String getGenero_alumno() {
        return genero_alumno;
    }

    public int getCelular_alumno() {
        return celular_alumno;
    }

    public String getCarrera() {
        return carrera;
    }

    public String getCorreo_estudiantil() {
        return correo_estudiantil;
    }

    public String getCampeon() {
        return campeon;
    }

    public String getSubcampeon() {
        return subcampeon;
    }


}
