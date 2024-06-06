package bdii.penca_ucu_2024.Repositories;

import bdii.penca_ucu_2024.Classes.Alumn;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;

import java.util.List;


public interface IAlumnRepository {
    AuthResponse register(Alumn alumni);
    List<Alumn> findAll();
}
