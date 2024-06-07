package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Plays_match;
import bdii.penca_ucu_2024.Repositories.IPlayMatchRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class PlayMatchService implements IPlayMatchRepository {
    private JdbcTemplate dbConnection;

    public PlayMatchService(JdbcTemplate dbConnection) {
        this.dbConnection = dbConnection;
    }

    @Override
    public boolean insert(Plays_match match) {
        try{
            String sql = "INSERT INTO juega_partido VALUES (?,?,?,?,?,?,?)";
            this.dbConnection.update(sql,match.getEquipo1(),match.getEquipo2(),match.getFecha_hora_partido(),match.getGol_equipo1(),match.getGol_equipo2(),match.getEtapa(),match.getID_estadio());
            return true;
        }catch(Exception e){
            System.out.println(e);
            return false;
        }
    }

    @Override
    public List<Plays_match> findAll() {
        String sql = "SELECT * FROM juega_partido";
        return dbConnection.query(sql, new BeanPropertyRowMapper<>(Plays_match.class));
    }

    @Override
    public Plays_match findPlay(String equipo1, String equipo2, Date fecha_partido){
        String sql = "SELECT * FROM Juega_partido WHERE equipo1 = ? AND equipo2 = ? AND fecha_hora_partido = ?";
        Object[] args = {equipo1, equipo2, fecha_partido};
        List<Plays_match> matches = dbConnection.query(sql, args, new BeanPropertyRowMapper<>(Plays_match.class));
        return matches.isEmpty() ? null : matches.get(0);
    }

    @Override
    public boolean update(Plays_match match) {
        Plays_match existMatch = findPlay(match.getEquipo1(), match.getEquipo2(), match.getFecha_hora_partido());
        if(existMatch != null) {
            String sql = "UPDATE juega_partido SET gol_equipo1 = ?, gol_equipo2 = ? WHERE equipo1 = ? AND equipo2 = ? AND fecha_hora_partido = ?";
            dbConnection.update(sql, match.getGol_equipo1(),
                    match.getGol_equipo2(),
                    match.getEquipo1(),
                    match.getEquipo2(),
                    match.getFecha_hora_partido());
            return true;
        }else{
            return false;
        }
    }

    @Override
    public List<Plays_match> findFixture(String stage){
        String sql = "SELECT * FROM Juega_partido WHERE etapa = ?";
        Object[] args = {stage};
        return dbConnection.query(sql, args , new BeanPropertyRowMapper<>(Plays_match.class));
    }

    @Override
    public boolean todayPlays(){
        String sql = "SELECT * FROM Juega_partido WHERE fecha_hora_partido = ?";
        Object[] args = {dateToday()};
        List<Plays_match> matches = dbConnection.query(sql, args, new BeanPropertyRowMapper<>(Plays_match.class));
        return !matches.isEmpty();
    }

    private Date dateToday(){
        LocalDate localDate = LocalDate.now();
        return Date.valueOf(localDate);
    }
}