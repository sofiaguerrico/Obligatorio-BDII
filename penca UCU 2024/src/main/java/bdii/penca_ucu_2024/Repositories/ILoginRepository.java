package bdii.penca_ucu_2024.Repositories;

import bdii.penca_ucu_2024.Classes.Login;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;
import org.springframework.stereotype.Repository;

@Repository
public interface ILoginRepository {
    AuthResponse login(Login loginRequest);
}
