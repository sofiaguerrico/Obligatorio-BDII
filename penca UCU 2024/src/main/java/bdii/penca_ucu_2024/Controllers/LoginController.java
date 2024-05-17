
package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Login;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;
import bdii.penca_ucu_2024.Services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    @Autowired
    LoginService ls;


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody Login loginRequest) {
        return ResponseEntity.ok(ls.login(loginRequest));
    }
}
