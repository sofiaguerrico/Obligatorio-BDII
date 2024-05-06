
package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Login;
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
    public ResponseEntity<Boolean> login(@RequestBody Login loginRequest) {

        Boolean resultado = ls.login(loginRequest.getCorreo_estudiantil(), loginRequest.getPassword_alumno());
        return new ResponseEntity<>(resultado, HttpStatus.OK);
    }
}
