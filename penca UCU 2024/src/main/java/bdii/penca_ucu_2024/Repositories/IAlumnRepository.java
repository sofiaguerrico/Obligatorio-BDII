package bdii.penca_ucu_2024.Repositories;

import bdii.penca_ucu_2024.Classes.Alumn;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;

import java.util.List;


public interface IAlumnRepository {
    AuthResponse register(Alumn alumni);
    List<Alumn> findAll();

    List<Alumn> getAllPoints();

    Alumn findByEmail(String correo_estudiantil);

    List<String> getCorreos();

    boolean modifyPoints(String equipo1, String equipo2, String fecha_hora_partido);

    boolean setPoint(int point, String correo_estudiantil);
}
