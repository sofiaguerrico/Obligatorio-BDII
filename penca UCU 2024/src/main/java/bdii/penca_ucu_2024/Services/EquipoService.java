package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Equipo;
import bdii.penca_ucu_2024.Classes.Prediction;
import bdii.penca_ucu_2024.Repositories.IEquipoRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipoService implements IEquipoRepository {
    private JdbcTemplate dbConnection;

    @Override
    public List<Prediction> get() {
        String sql = "SELECT * FROM equipo";
        BeanPropertyRowMapper<Prediction> rowMapper = new BeanPropertyRowMapper(Equipo.class);
        return this.dbConnection.query(sql, rowMapper).stream().toList();
    }
}