package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Career;
import bdii.penca_ucu_2024.Repositories.ICareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CareerService implements ICareerRepository {

    private final JdbcTemplate dbConnection;

    @Autowired
    public CareerService(JdbcTemplate dbConnection) {
        this.dbConnection = dbConnection;
    }

    @Override
    public List<Career> get() {
        String sql = "SELECT * FROM carrera";
        BeanPropertyRowMapper<Career> rowMapper = new BeanPropertyRowMapper(Career.class);
        return this.dbConnection.query(sql, rowMapper).stream().toList();
    }

    @Override
    public boolean insert(Career career) {
        try{

            String sql = "INSERT INTO carrera VALUES (?)";
            this.dbConnection.update(sql,career.getNombre_carrera());
            return true;
        }catch(Exception e){
            System.out.println(e);
            return false;
        }
    }
}
