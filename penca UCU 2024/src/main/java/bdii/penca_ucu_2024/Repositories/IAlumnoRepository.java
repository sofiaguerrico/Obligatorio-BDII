package bdii.penca_ucu_2024.Repositories;

import bdii.penca_ucu_2024.Classes.Alumno;
import bdii.penca_ucu_2024.JSONClasses.UserRequest;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;

import java.util.List;


public interface IAlumnoRepository {
    AuthResponse register(Alumno alumni);
    List<Alumno> findAll();
}
