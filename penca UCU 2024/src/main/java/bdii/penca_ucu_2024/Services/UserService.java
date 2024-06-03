package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Administrador;
import bdii.penca_ucu_2024.Classes.Alumno;
import bdii.penca_ucu_2024.JSONClasses.Role;
import bdii.penca_ucu_2024.JSONClasses.UserRequest;
import bdii.penca_ucu_2024.Repositories.IUserRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserRepository {
    private final JdbcTemplate dbConnection;

    public UserService(JdbcTemplate dbConnection) {
        this.dbConnection = dbConnection;
    }


    @Override
    public Optional<UserRequest> find(String correo_estudiantil) {
        Optional<UserRequest> alumnoOptional = findInAlumno(correo_estudiantil);
        if (alumnoOptional.isEmpty()) {
            alumnoOptional = findInAdministrador(correo_estudiantil);
        }
        return alumnoOptional;
    }

    private Optional<UserRequest> findInAlumno(String correo_estudiantil) {

        String sql = "SELECT * FROM Alumno WHERE correo_estudiantil = ?";
        BeanPropertyRowMapper<Alumno> rowMapperAlumno = new BeanPropertyRowMapper<>(Alumno.class);
        List<Alumno> alumnos = this.dbConnection.query(sql, new Object[]{correo_estudiantil}, rowMapperAlumno);

        if (!alumnos.isEmpty()) {

            Alumno alumno = alumnos.get(0);
            UserRequest userRequest = new UserRequest();
            userRequest.setAlumni(alumno);
            String sql2 = "SELECT * FROM alumno WHERE correo_estudiantil = ?";
            BeanPropertyRowMapper<Alumno> rowMapperAlumnoRequest = new BeanPropertyRowMapper<>(Alumno.class);
            List<Alumno> alumni = this.dbConnection.query(sql2, new Object[]{correo_estudiantil}, rowMapperAlumnoRequest);

            if (!alumni.isEmpty()) {
                userRequest.setPassword(alumni.get(0).getPassword_alumno());
                userRequest.setRole(Role.USER);
            }
            return Optional.of(userRequest);
        }
        return Optional.empty();
    }

    private Optional<UserRequest> findInAdministrador(String correo_admin) {
        String sql = "SELECT * FROM Administrador WHERE correo_admin = ?";
        BeanPropertyRowMapper<Administrador> rowMapperAdministrador = new BeanPropertyRowMapper<>(Administrador.class);
        List<Administrador> administradores = this.dbConnection.query(sql, new Object[]{correo_admin}, rowMapperAdministrador);

        if (!administradores.isEmpty()) {

            Administrador administrador = administradores.get(0);
            UserRequest userRequest = new UserRequest();
            userRequest.setAdministrador(administrador);
            userRequest.setRole(Role.ADMIN);
            return Optional.of(userRequest);

        }
        return Optional.empty();
    }

    @Override
    public boolean isAdmin(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String mail = authentication.getName();
        Optional<UserRequest> admin = findInAdministrador(mail);
        return admin.isPresent();
    }

}