package bdii.penca_ucu_2024.Repositories;

import bdii.penca_ucu_2024.Classes.Career;
import bdii.penca_ucu_2024.Classes.Studies;

import java.util.List;

public interface IStudiesRepository {
    Career getCareer(String correo_estudiantil);

    List<Studies> careersAlumn();
}
