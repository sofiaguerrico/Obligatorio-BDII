package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Plays_match;
import bdii.penca_ucu_2024.Classes.Prediction;
import bdii.penca_ucu_2024.Repositories.IPlayMatchRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

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
            BeanPropertyRowMapper<Prediction> rowMapper = new BeanPropertyRowMapper(Plays_match.class);
            this.dbConnection.update(sql,match.getEquipo1(),match.getEquipo2(),match.getFecha_hora_partido(),match.getGol_equipo1(),match.getGol_equipo2(),match.getEtapa(),match.getID_estadio());
            return true;
        }catch(Exception e){
            System.out.println(e);
            return false;
        }
    }
}
