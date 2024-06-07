package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.JSONClasses.Role;
import bdii.penca_ucu_2024.JSONClasses.UserRequest;
import bdii.penca_ucu_2024.Repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements org.springframework.security.core.userdetails.UserDetailsService {

    private final IUserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserRequest> user = userRepository.find(username);
        if (user.isPresent()) {
            UserRequest userRequest = user.get();
            if(userRequest.getAdministrador() != null){
                userRequest.setRole(Role.ROLE_ADMIN);
                System.out.println("Logeado como admin");
                return userRequest;
            }else if(userRequest.getAlumni() != null){
                userRequest.setRole(Role.ROLE_USER);
                System.out.println("Logeado como alumno");
                return userRequest;
            }
        }
        return user.get();
    }
}