package bdii.penca_ucu_2024.Repositories;

import bdii.penca_ucu_2024.JSONClasses.UserRequest;

import java.util.Optional;

public interface IUserRepository {
    Optional<UserRequest> find(String correo_estudiantil);
    boolean isAdmin();
}
