package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Team;
import bdii.penca_ucu_2024.Classes.Prediction;
import bdii.penca_ucu_2024.Repositories.ITeamRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService implements ITeamRepository {
    private JdbcTemplate dbConnection;

    public TeamService(JdbcTemplate dbConnection) {
        this.dbConnection = dbConnection;
    }

    @Override
    public List<Prediction> get() {
        String sql = "SELECT * FROM equipo";
        BeanPropertyRowMapper<Prediction> rowMapper = new BeanPropertyRowMapper(Team.class);
        return this.dbConnection.query(sql, rowMapper).stream().toList();
    }

    @Override
    public boolean insert(Team team) {
        try{
            System.out.println(team.getNombre_equipo());
            System.out.println(team.getBandera());
            String sql = "INSERT INTO equipo VALUES (?,?)";
            this.dbConnection.update(sql,team.getNombre_equipo(),team.getBandera());
            return true;
        }catch(Exception e){
            System.out.println(e);
            return false;
        }
    }
}