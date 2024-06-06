package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Alumn;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;
import bdii.penca_ucu_2024.Repositories.IAlumnRepository;
import bdii.penca_ucu_2024.Security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.apache.commons.codec.digest.DigestUtils;
import java.util.List;

@Service
public class AlumnService implements IAlumnRepository {

    private JdbcTemplate dbConnection;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    public AlumnService(JdbcTemplate dbConnection) {
        this.dbConnection = dbConnection;
    }


    @Override
    public AuthResponse register(Alumn alumn) {

        AuthResponse authResponse = new AuthResponse();
        String sql1= "SELECT * FROM Alumno WHERE correo_estudiantil = ?";
        BeanPropertyRowMapper<Alumn> rowMapper = new BeanPropertyRowMapper<>(Alumn.class);
        List<Alumn> usuario = this.dbConnection.query(sql1, new Object[]{alumn.getCorreo_estudiantil()}, rowMapper);
        if (!usuario.isEmpty()) {
            authResponse.setMessage("El usuario ya existe");
            return authResponse;
        }

        String sql2 = "INSERT INTO Alumno VALUES (?,?,?,?,?,?,?,?,?,?)";
        String hashing = DigestUtils.md5Hex(alumn.getPassword_alumno());
        dbConnection.update(sql2, alumn.getCI(), alumn.getNombre_alumno(), alumn.getApellido_alumno(),
                alumn.getGenero_alumno(), alumn.getCelular_alumno(),hashing, alumn.getCorreo_estudiantil(),
                alumn.getCampeon(), alumn.getSubcampeon(), alumn.getPuntos_totales());

        authResponse.setToken(jwtUtils.generateAccessToken(alumn.getCorreo_estudiantil()));
        authResponse.setMessage("Usuario Creado con exito");
        return authResponse;
    }

    @Override
    public List<Alumn> findAll() {
        String sql1= "SELECT * FROM Alumno";
        return this.dbConnection.query(sql1, new BeanPropertyRowMapper<>(Alumn.class));
    }
}
