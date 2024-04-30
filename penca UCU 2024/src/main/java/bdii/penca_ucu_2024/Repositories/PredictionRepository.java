
package bdii.penca_ucu_2024.Repositories;

import java.util.List;

import bdii.penca_ucu_2024.Classes.Prediction;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class PredictionRepository {
    private JdbcTemplate dbConnection;

    public PredictionRepository() {
    }

    public List<Prediction> getAll() {
        String sql = "SELECT * FROM Predictions";
        BeanPropertyRowMapper<Prediction> rowMapper = new BeanPropertyRowMapper(Prediction.class);
        System.out.println("Prueba ");
        return this.dbConnection.query(sql, rowMapper).stream().toList();
    }
}
