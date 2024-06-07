package bdii.penca_ucu_2024.Repositories;

import bdii.penca_ucu_2024.Classes.Plays_match;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

public interface IPlayMatchRepository {
    boolean insert(Plays_match match);

    List<Plays_match> findAll();

    Plays_match findPlay(String equipo1, String equipo2, Date fecha_partido);

    boolean update(Plays_match match);

    List<Plays_match> findFixture(String stage);

    boolean todayPlays();
}
