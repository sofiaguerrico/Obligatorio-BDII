package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Administrador;
import bdii.penca_ucu_2024.Classes.Alumno;
import bdii.penca_ucu_2024.Classes.Login;
import bdii.penca_ucu_2024.JSONClasses.AlumnoRequest;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;
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
    public AuthResponse register(AlumnoRequest alumni) {
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
//    public Optional<AlumnoRequest> find(String correo_estudiantil) {
//        String sql1 = "SELECT * FROM Alumno WHERE correo_estudiantil = ?";
//        BeanPropertyRowMapper<Alumno> rowMapperAlumno = new BeanPropertyRowMapper<>(Alumno.class);
//        List<Alumno> alumnos = this.dbConnection.query(sql1, new Object[]{correo_estudiantil}, rowMapperAlumno);
//
//        if (!alumnos.isEmpty()) {
//            Alumno alumno = alumnos.get(0);
//
//            // Crear un nuevo AlumnoRequest y asignar el Alumno encontrado
//            AlumnoRequest alumnoRequest = new AlumnoRequest();
//            alumnoRequest.setAlumni(alumno);
//
//            String sql2 = "SELECT * FROM Login WHERE correo_estudiantil = ?";
//            BeanPropertyRowMapper<AlumnoRequest> rowMapperAlumnoRequest = new BeanPropertyRowMapper<>(AlumnoRequest.class);
//            List<AlumnoRequest> alumni = this.dbConnection.query(sql2, new Object[]{correo_estudiantil}, rowMapperAlumnoRequest);
//
//            if (!alumni.isEmpty()) {
//                AlumnoRequest alumnoRequestFromLogin = alumni.get(0);
//                alumnoRequest.setPassword(alumnoRequestFromLogin.getPassword());
//            }
//
//            return Optional.of(alumnoRequest);
//        }
//
//        return Optional.empty();
//    }

    public Optional<AlumnoRequest> find(String correo_estudiantil) {
        Optional<AlumnoRequest> alumnoOptional = findInAlumno(correo_estudiantil);
        if (alumnoOptional.isEmpty()) {
            alumnoOptional = findInAdministrador(correo_estudiantil);
        }
        return alumnoOptional;
    }

    private Optional<AlumnoRequest> findInAlumno(String correo_estudiantil) {
        String sql = "SELECT * FROM Alumno WHERE correo_estudiantil = ?";
        BeanPropertyRowMapper<Alumno> rowMapperAlumno = new BeanPropertyRowMapper<>(Alumno.class);
        List<Alumno> alumnos = this.dbConnection.query(sql, new Object[]{correo_estudiantil}, rowMapperAlumno);

        if (!alumnos.isEmpty()) {
            Alumno alumno = alumnos.get(0);
            AlumnoRequest alumnoRequest = new AlumnoRequest();
            alumnoRequest.setAlumni(alumno);

            String sql2 = "SELECT * FROM Login WHERE correo_estudiantil = ?";
            BeanPropertyRowMapper<AlumnoRequest> rowMapperAlumnoRequest = new BeanPropertyRowMapper<>(AlumnoRequest.class);
            List<AlumnoRequest> alumni = this.dbConnection.query(sql2, new Object[]{correo_estudiantil}, rowMapperAlumnoRequest);

            if (!alumni.isEmpty()) {
                AlumnoRequest alumnoRequestFromLogin = alumni.get(0);
                alumnoRequest.setPassword(alumnoRequestFromLogin.getPassword());
            }

            return Optional.of(alumnoRequest);
        }

        return Optional.empty();
    }

    private Optional<AlumnoRequest> findInAdministrador(String correo_estudiantil) {
        String sql = "SELECT * FROM Administrador WHERE correo_administrador = ?";
        BeanPropertyRowMapper<Administrador> rowMapperAdministrador = new BeanPropertyRowMapper<>(Administrador.class);
        List<Administrador> administradores = this.dbConnection.query(sql, new Object[]{correo_estudiantil}, rowMapperAdministrador);

        if (!administradores.isEmpty()) {
            Administrador administrador = administradores.get(0);
            AlumnoRequest alumnoRequest = new AlumnoRequest();
            alumnoRequest.setAdministrador(administrador);

            // No hay necesidad de buscar en la tabla Login para el administrador

            return Optional.of(alumnoRequest);
        }

        return Optional.empty();
    }



    @Override
    public List<Alumno> findAll() {
        String sql1= "SELECT * FROM Alumno";
        return this.dbConnection.query(sql1, new BeanPropertyRowMapper<>(Alumno.class));
    }
}
