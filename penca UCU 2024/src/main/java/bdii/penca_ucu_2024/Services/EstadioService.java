package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Repositories.IEstadioRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;


@Service
public class EstadioService implements IEstadioRepository {

    private JdbcTemplate dbConnection;

}
