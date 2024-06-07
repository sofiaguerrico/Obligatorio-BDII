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
    private final JdbcTemplate dbConnection;

    @Autowired
    public PredictionService(JdbcTemplate dbConnection) {
        this.dbConnection = dbConnection;
    }


    @Override
    public List<Prediction> getAll() {
        String sql = "SELECT * FROM Predice";
        BeanPropertyRowMapper<Prediction> rowMapper = new BeanPropertyRowMapper(Prediction.class);
        return this.dbConnection.query(sql, rowMapper).stream().toList();
    }

    @Override
    public boolean insert(Prediction prediction) {
        try{
            String sql = "INSERT INTO Predice VALUES (?,?,?,?,?,?)";
            this.dbConnection.update(sql,prediction.getCorreo_estudiantil(),prediction.getEquipo1(),prediction.getEquipo2(),prediction.getFecha_hora_partido(),prediction.getGol_equipo1(),prediction.getGol_equipo2());
            return true;
        }catch(Exception e){
            System.out.println(e);
            return false;
        }
    }

    @Override
    public Prediction findPrediction(Prediction prediction){
        String sql = "SELECT * FROM predice WHERE correo_estudiantil = ? AND equipo1 = ? AND equipo2 = ? AND fecha_hora_partido = ?";
        Object[] args = {prediction.getCorreo_estudiantil(), prediction.getEquipo1(), prediction.getEquipo2(), prediction.getFecha_hora_partido()};
        List<Prediction> predictions = dbConnection.query(sql, args, new BeanPropertyRowMapper<>(Prediction.class));
        return predictions.isEmpty() ? null : predictions.get(0);
    }


    @Override
    public boolean modifyPrediction(Prediction prediction){
        if(findPrediction(prediction) == null){
            System.out.println("Prediction no existe");
            return false;
        }else {
            String sql = "UPDATE predice SET gol_equipo1 = ?, gol_equipo2 = ? WHERE correo_estudiantil = ? AND equipo1 = ? AND equipo2 = ? AND fecha_hora_partido = ?";
            dbConnection.update(sql, prediction.getGol_equipo1(),
                    prediction.getGol_equipo2(),
                    prediction.getCorreo_estudiantil(),
                    prediction.getEquipo1(),
                    prediction.getEquipo2(),
                    prediction.getFecha_hora_partido());
            return true;
        }
    }
}
