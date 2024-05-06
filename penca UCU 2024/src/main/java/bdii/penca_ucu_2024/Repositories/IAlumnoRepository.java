package bdii.penca_ucu_2024.Repositories;

public interface IAlumnoRepository {
    Boolean register(int CI, String nombre_alumno, String apellido_alumno, String genero_alumno, int celular_alumno, String carrera, String correo_estudiantil, String campeon, String subcampeon, String password);
}
