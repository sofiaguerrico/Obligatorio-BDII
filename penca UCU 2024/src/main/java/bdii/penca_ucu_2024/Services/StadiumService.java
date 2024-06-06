package bdii.penca_ucu_2024.Services;


import bdii.penca_ucu_2024.Classes.Stadium;
import bdii.penca_ucu_2024.Repositories.IStadiumRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;


@Service
public class StadiumService implements IStadiumRepository {

    private JdbcTemplate dbConnection;

    public StadiumService(JdbcTemplate dbConnection) {
        this.dbConnection = dbConnection;
    }

    @Override
    public boolean insert(Stadium stadium) {
        try{
            String sql = "INSERT INTO estadio VALUES (?,?,?)";
            this.dbConnection.update(sql,stadium.getID_estadio(),stadium.getNombre_estadio(),stadium.getDireccion_estadio());
            return true;
        }catch(Exception e){
            System.out.println(e);
            return false;
        }
    }

}
