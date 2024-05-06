package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Login;
import bdii.penca_ucu_2024.Repositories.ILoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.apache.commons.codec.digest.DigestUtils;

import java.util.List;

@Service
public class LoginService implements ILoginRepository {
    private JdbcTemplate dbConnection;

    @Autowired
    public LoginService(JdbcTemplate dbConnection) {
        this.dbConnection = dbConnection;
    }


    @Override
    public Boolean login(String email, String password) {
        String sql = "SELECT * FROM Login WHERE correo_estudiantil = ?";

        BeanPropertyRowMapper<Login> rowMapper = new BeanPropertyRowMapper<>(Login.class);

        List<Login> usuario = this.dbConnection.query(sql, new Object[]{email}, rowMapper);
        if (usuario.isEmpty()) {
            return false;
        }
        String hashing = DigestUtils.md5Hex(password);

        if(hashing.equals(usuario.get(0).getPassword_alumno())){
            return true;
        };
        return false;
    }


}
