package bdii.penca_ucu_2024.Repositories;

import bdii.penca_ucu_2024.Classes.Career;
import java.util.List;

public interface ICareerRepository {
    List<Career> get();

    boolean insert(Career career);
}
