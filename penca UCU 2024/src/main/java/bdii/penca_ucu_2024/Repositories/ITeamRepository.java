package bdii.penca_ucu_2024.Repositories;

import bdii.penca_ucu_2024.Classes.Prediction;
import bdii.penca_ucu_2024.Classes.Team;

import java.util.List;

public interface ITeamRepository {
    List<Prediction> get();

    boolean insert(Team team);
}
