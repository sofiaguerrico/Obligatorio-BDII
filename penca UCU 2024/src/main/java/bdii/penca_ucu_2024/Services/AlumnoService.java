package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Administrador;
import bdii.penca_ucu_2024.Classes.Alumno;
import bdii.penca_ucu_2024.Classes.Login;
import bdii.penca_ucu_2024.JSONClasses.UserRequest;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;
import bdii.penca_ucu_2024.JSONClasses.Role;
import bdii.penca_ucu_2024.Repositories.IAlumnoRepository;
import bdii.penca_ucu_2024.Security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.apache.commons.codec.digest.DigestUtils;

import java.util.List;
import java.util.Optional;

@Service
public class AlumnoService implements IAlumnoRepository {

    private JdbcTemplate dbConnection;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    public AlumnoService(JdbcTemplate dbConnection) {
        this.dbConnection = dbConnection;
    }


    @Override
    public AuthResponse register(UserRequest alumni) {
        AuthResponse authResponse = new AuthResponse();
        String sql1= "SELECT * FROM Alumno WHERE correo_estudiantil = ?";
        BeanPropertyRowMapper<Login> rowMapper = new BeanPropertyRowMapper<>(Login.class);
        Alumno alumno = alumni.getAlumni();
        List<Login> usuario = this.dbConnection.query(sql1, new Object[]{alumno.getCorreo_estudiantil()}, rowMapper);
        if (!usuario.isEmpty()) {
            authResponse.setMessage("El usuario ya existe");
            return authResponse;
        }

        String sql2 = "INSERT INTO Alumno VALUES (?,?,?,?,?,?,?,?,?)";
        String sql3 = "INSERT INTO Login VALUES (?,?)";

        dbConnection.update(sql2, alumno.getCI(), alumno.getNombre_alumno(), alumno.getApellido_alumno(),
                alumno.getGenero_alumno(),alumno.getCelular_alumno(),alumno.getCarrera(),alumno.getCorreo_estudiantil(),
                alumno.getCampeon(),alumno.getSubcampeon()); // Se inserta nuevo registro en la BDD

        String hashing = DigestUtils.md5Hex(alumni.getPassword());
        dbConnection.update(sql3,alumno.getCorreo_estudiantil(),hashing);


        authResponse.setToken(jwtUtils.generateAccessToken(alumno.getCorreo_estudiantil()));
        authResponse.setMessage("Usuario Creado con exito");
        return authResponse;
    }




    @Override
    public List<Alumno> findAll() {
        String sql1= "SELECT * FROM Alumno";
        return this.dbConnection.query(sql1, new BeanPropertyRowMapper<>(Alumno.class));
    }
}
