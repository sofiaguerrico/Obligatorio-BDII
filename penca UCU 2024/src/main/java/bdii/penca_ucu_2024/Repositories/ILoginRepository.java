package bdii.penca_ucu_2024.Repositories;

import org.springframework.stereotype.Repository;

@Repository
public interface ILoginRepository {
    Boolean login(String email, String password);
}
