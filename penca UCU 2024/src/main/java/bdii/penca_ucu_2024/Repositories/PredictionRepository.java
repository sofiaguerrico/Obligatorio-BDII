
package bdii.penca_ucu_2024.Repositories;

import java.util.List;

import bdii.penca_ucu_2024.Classes.Prediction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PredictionRepository {

    @Autowired
    private JdbcTemplate dbConnection;


    public PredictionRepository() {
    }

    public List<Prediction> getAll() {
        String sql = "SELECT * FROM Predicción";
        BeanPropertyRowMapper<Prediction> rowMapper = new BeanPropertyRowMapper(Prediction.class);
        return this.dbConnection.query(sql, rowMapper).stream().toList();
    }
}
