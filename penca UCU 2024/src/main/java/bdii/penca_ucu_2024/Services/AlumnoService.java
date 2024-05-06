package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Login;
import bdii.penca_ucu_2024.Repositories.IAlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.apache.commons.codec.digest.DigestUtils;

import java.util.List;

@Service
public class AlumnoService implements IAlumnoRepository {
    private JdbcTemplate dbConnection;

    @Autowired
    public AlumnoService(JdbcTemplate dbConnection) {
        this.dbConnection = dbConnection;
    }


    @Override
    public Boolean register(int CI, String nombre_alumno, String apellido_alumno, String genero_alumno, int celular_alumno, String carrera, String correo_estudiantil, String campeon, String subcampeon, String password) {
        String sql1= "SELECT * FROM Alumno WHERE correo_estudiantil = ?";
        BeanPropertyRowMapper<Login> rowMapper = new BeanPropertyRowMapper<>(Login.class);

        List<Login> usuario = this.dbConnection.query(sql1, new Object[]{correo_estudiantil}, rowMapper);
        if (!usuario.isEmpty()) {
            return false;
        }

        String sql2 = "INSERT INTO Alumno VALUES (?,?,?,?,?,?,?,?,?)";
        String sql3 = "INSERT INTO Login VALUES (?,?)";

        dbConnection.update(sql2, CI, nombre_alumno, apellido_alumno,genero_alumno,celular_alumno,carrera,correo_estudiantil,campeon,subcampeon);
        String hashing = DigestUtils.md5Hex(password);
        dbConnection.update(sql3,correo_estudiantil,hashing);
        return true;

    }
}
