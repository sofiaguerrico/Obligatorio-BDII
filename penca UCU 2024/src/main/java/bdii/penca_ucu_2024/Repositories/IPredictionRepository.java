package bdii.penca_ucu_2024.Repositories;

import java.sql.Date;
import java.util.List;

import bdii.penca_ucu_2024.Classes.Prediction;
import org.springframework.stereotype.Repository;

@Repository
public interface IPredictionRepository {
    List<Prediction> getAll();

    boolean insert(Prediction prediction);

    Prediction findPrediction(Prediction prediction);

    boolean modifyPrediction(Prediction prediction);

    List<Prediction> findPredictionForMatch(String equipo1, String equipo2, Date fecha_hora_partido);
}
