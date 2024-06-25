package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Admin;
import bdii.penca_ucu_2024.Classes.Alumn;
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
        BeanPropertyRowMapper<Alumn> rowMapperAlumno = new BeanPropertyRowMapper<>(Alumn.class);
        List<Alumn> alumns = this.dbConnection.query(sql, new Object[]{correo_estudiantil}, rowMapperAlumno);

        if (!alumns.isEmpty()) {

            Alumn alumn = alumns.get(0);
            UserRequest userRequest = new UserRequest();
            userRequest.setAlumni(alumn);
            String sql2 = "SELECT * FROM alumno WHERE correo_estudiantil = ?";
            BeanPropertyRowMapper<Alumn> rowMapperAlumnoRequest = new BeanPropertyRowMapper<>(Alumn.class);
            List<Alumn> alumni = this.dbConnection.query(sql2, new Object[]{correo_estudiantil}, rowMapperAlumnoRequest);

            if (!alumni.isEmpty()) {
                userRequest.setPassword(alumni.get(0).getPassword_alumno());
                userRequest.setRole(Role.ROLE_USER);
            }
            return Optional.of(userRequest);
        }
        return Optional.empty();
    }

    private Optional<UserRequest> findInAdministrador(String correo_admin) {
        String sql = "SELECT * FROM Administrador WHERE correo_admin = ?";
        BeanPropertyRowMapper<Admin> rowMapperAdministrador = new BeanPropertyRowMapper<>(Admin.class);
        List<Admin> administradores = this.dbConnection.query(sql, new Object[]{correo_admin}, rowMapperAdministrador);

        if (!administradores.isEmpty()) {
            Admin admin = administradores.get(0);
            UserRequest userRequest = new UserRequest();
            userRequest.setAdministrador(admin);
            userRequest.setRole(Role.ROLE_ADMIN);
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