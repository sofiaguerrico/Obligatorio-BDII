package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Prediction;
import bdii.penca_ucu_2024.Repositories.IPredictionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PredictionService implements IPredictionRepository {
    private JdbcTemplate dbConnection;

    @Autowired
    public PredictionService(JdbcTemplate dbConnection) {
        this.dbConnection = dbConnection;
    }
//    IPredictionRepository predictionRepository;
//    //buena practica para desp realizar test unitarios
//    @Autowired
//    public PredictionService(IPredictionRepository predictionRepository) {
//        this.predictionRepository = predictionRepository;
//    }

    @Override
    public List<Prediction> getAll() {
        String sql = "SELECT * FROM Predicción";
        BeanPropertyRowMapper<Prediction> rowMapper = new BeanPropertyRowMapper(Prediction.class);
        return this.dbConnection.query(sql, rowMapper).stream().toList();
    }

    @Override
    public int setId(int id) {
        String sql = "INSERT INTO Predicción (id_predicción) VALUES (?)";
        dbConnection.update(sql, id);
        return id;
    }

    @Override
    public List<Prediction> deletePrediction(int predictionId) {
        String sql = "DELETE FROM Predicción WHERE id_predicción = ?";
        this.dbConnection.update(sql, predictionId);
        return getAll();
    }


}
