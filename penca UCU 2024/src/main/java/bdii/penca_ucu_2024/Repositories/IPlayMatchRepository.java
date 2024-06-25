package bdii.penca_ucu_2024.Repositories;

import bdii.penca_ucu_2024.Classes.Plays_match;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public interface IPlayMatchRepository {
    boolean insert(Plays_match match);

    List<Plays_match> findAll();

    Plays_match findPlay(String equipo1, String equipo2, String fecha_partido);

    Plays_match update(Plays_match match);

    List<Plays_match> findFixture(String stage);

    boolean todayPlays();

    boolean modifyPoints(String equipo1, String equipo2, String fecha_hora_partido, int gol_equipo1, int gol_equipo2, String etapa);
}
