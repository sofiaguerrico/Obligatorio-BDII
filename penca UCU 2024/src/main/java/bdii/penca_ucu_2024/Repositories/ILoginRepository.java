package bdii.penca_ucu_2024.Repositories;

import bdii.penca_ucu_2024.JSONClasses.LoginRequest;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;
import org.springframework.stereotype.Repository;

@Repository
public interface ILoginRepository {
    AuthResponse login(LoginRequest loginRequest);
}
