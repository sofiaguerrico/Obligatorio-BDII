package bdii.penca_ucu_2024.Repositories;

import bdii.penca_ucu_2024.Classes.Prediction;
import java.util.List;

public interface IEquipoRepository {
    List<Prediction> get();
}
