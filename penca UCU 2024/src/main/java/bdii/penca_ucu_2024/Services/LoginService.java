package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Login;
import bdii.penca_ucu_2024.JSONClasses.UserRequest;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;
import bdii.penca_ucu_2024.Repositories.IAlumnoRepository;
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
    private IAlumnoRepository alumnoRepository;
    private JdbcTemplate dbConnection;
    @Autowired
    private UserService userService;

    @Autowired
    public LoginService(JdbcTemplate dbConnection, JwtUtils jwtUtils) {
        this.dbConnection = dbConnection;
        this.jwtUtils = jwtUtils;
    }

    @Override
//    public AuthResponse login(Login loginRequest) {
//        AuthResponse authResponse = new AuthResponse();
//            String email = loginRequest.getCorreo_estudiantil();
//            String password = loginRequest.getPassword_alumno();
//
//            String sql = "SELECT * FROM Login WHERE correo_estudiantil = ?";
//            BeanPropertyRowMapper<Login> rowMapper = new BeanPropertyRowMapper<>(Login.class);
//            List<Login> usuarios = this.dbConnection.query(sql, new Object[]{email}, rowMapper);
//
//            if (usuarios.isEmpty()) {
//                authResponse.setMessage("Usuario no encontrado");
//                return authResponse; // El usuario no existe
//            }
//
//            // Verificar la contraseña
//            Login usuario = usuarios.get(0);
//            String hashing = DigestUtils.md5Hex(password);
//            if (!hashing.equals(usuario.getPassword_alumno())) {
//                authResponse.setMessage("Contraseña incorrecta");
//                return authResponse;
//            }
//
//
////            UserDetails userDetails = User.builder()
////                    .username(usuario.getCorreo_estudiantil())
////                    .password(usuario.getPassword_alumno())
////                    .build();
//            String token = jwtUtils.generateAccessToken(usuario.getCorreo_estudiantil());
//            authResponse.setToken(token);
//            authResponse.setMessage("Login exitoso");
//            return authResponse;
//    }
    public AuthResponse login(Login loginRequest) {
        AuthResponse authResponse = new AuthResponse();
        String email = loginRequest.getCorreo_estudiantil();
        String password = loginRequest.getPassword_alumno();
        String hashing = DigestUtils.md5Hex(password);

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



//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        Login loginModel = login(email, )
//    }
}
