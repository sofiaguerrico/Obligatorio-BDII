package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.JSONClasses.LoginRequest;
import bdii.penca_ucu_2024.JSONClasses.UserRequest;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;
import bdii.penca_ucu_2024.Repositories.IAlumnRepository;
import bdii.penca_ucu_2024.Repositories.ILoginRepository;
import bdii.penca_ucu_2024.Security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.apache.commons.codec.digest.DigestUtils;

import java.util.Collection;
import java.util.Optional;

@Service
public class LoginService implements ILoginRepository {

    private final JwtUtils jwtUtils;
    private AuthenticationManager authenticationManager;
    private IAlumnRepository alumnoRepository;
    private JdbcTemplate dbConnection;

    @Autowired
    private UserService userService;

    @Autowired
    public LoginService(JdbcTemplate dbConnection, JwtUtils jwtUtils) {
        this.dbConnection = dbConnection;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public AuthResponse login(LoginRequest login) {
        AuthResponse authResponse = new AuthResponse();

        String email = login.getCorreo();
        String hashing = DigestUtils.md5Hex(login.getPassword());

        Optional<UserRequest> alumnoOptional = userService.find(email);

        if (alumnoOptional.isEmpty()) {
            authResponse.setMessage("Usuario no encontrado");
            return authResponse;
        }

        UserRequest userRequest = alumnoOptional.get();
        Collection<? extends GrantedAuthority> usuarioType = userRequest.getAuthorities();
        for (GrantedAuthority authority : usuarioType) {
            if ("USER".equals(authority.getAuthority())) {
                // Encontrado el rol "USER"
                if (!hashing.equals(alumnoOptional.get().getPassword())) {
                    authResponse.setMessage("Contraseña incorrecta");

                } else {
                    String token = jwtUtils.generateAccessToken(email);
                    authResponse.setToken(token);
                    authResponse.setMessage("Login exitoso como Alumno");

                }
            }
            if ("ADMIN".equals(authority.getAuthority())) {
                // Encontrado el rol "ADMIN"
                String adminPassword = DigestUtils.md5Hex(alumnoOptional.get().getPassword());
                if (!hashing.equals(adminPassword)) {
                    authResponse.setMessage("Contraseña incorrecta");
                } else {

                    String token = jwtUtils.generateAccessToken(email);
                    authResponse.setToken(token);
                    authResponse.setMessage("Login exitoso como Administrador");

                }
            }
        }
        return authResponse;
    }
}
