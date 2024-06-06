package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.JSONClasses.LoginRequest;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;
import bdii.penca_ucu_2024.Services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    @Autowired
    LoginService ls;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest credenciales) {
        return ResponseEntity.ok(ls.login(credenciales));
    }
}
