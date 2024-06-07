package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Career;
import bdii.penca_ucu_2024.Classes.Studies;
import bdii.penca_ucu_2024.Repositories.IStudiesRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudiesService implements IStudiesRepository {

    private final JdbcTemplate dbConnection;

    public StudiesService(JdbcTemplate dbConnection) {
        this.dbConnection = dbConnection;
    }
    @Override
    public Career getCareer(String correo_estudiantil){
        String sql = "SELECT * FROM cursa WHERE correo_estudiantil = ?";
        Object[] args = {correo_estudiantil};
        List<Career> career = dbConnection.query(sql, args, new BeanPropertyRowMapper<>(Career.class));
        return career.isEmpty() ? null : career.get(0);
    }

    @Override
    public List<Studies> careersAlumn(){
        String sql = "SELECT * FROM cursa ORDER BY correo_estudiantil";
        List<Studies> careers = dbConnection.query(sql, new BeanPropertyRowMapper<>(Studies.class));
        return careers;
    }
}
