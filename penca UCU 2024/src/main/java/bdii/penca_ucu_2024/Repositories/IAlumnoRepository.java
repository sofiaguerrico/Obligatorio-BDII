package bdii.penca_ucu_2024.Repositories;

import bdii.penca_ucu_2024.Classes.Alumno;
import bdii.penca_ucu_2024.JSONClasses.UserRequest;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;

import java.util.List;


public interface IAlumnoRepository {
    //AuthResponse register(int CI, String nombre_alumno, String apellido_alumno, String genero_alumno, int celular_alumno, String carrera, String correo_estudiantil, String campeon, String subcampeon, String password);
    AuthResponse register(UserRequest alumni);
    List<Alumno> findAll();
}
