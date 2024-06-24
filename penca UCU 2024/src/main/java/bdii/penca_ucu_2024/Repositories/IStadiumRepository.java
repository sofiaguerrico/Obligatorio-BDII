package bdii.penca_ucu_2024.Repositories;

import bdii.penca_ucu_2024.Classes.Stadium;

import java.util.List;

public interface IStadiumRepository {
    boolean insert(Stadium stadium);

    List<Stadium> findAll();
}
