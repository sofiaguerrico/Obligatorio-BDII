package bdii.penca_ucu_2024.Repositories;

import java.util.List;

import bdii.penca_ucu_2024.Classes.Prediction;
import org.springframework.stereotype.Repository;

@Repository
public interface IPredictionRepository {
    List<Prediction> getAll();

    boolean insert(Prediction prediction);

    Prediction findPrediction(Prediction prediction);

    boolean modifyPrediction(Prediction prediction);

}
