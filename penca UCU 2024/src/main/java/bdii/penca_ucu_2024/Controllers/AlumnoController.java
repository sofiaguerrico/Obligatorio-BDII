package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Alumno;
import bdii.penca_ucu_2024.JSONClasses.UserRequest;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;
import bdii.penca_ucu_2024.Services.AlumnoService;

import bdii.penca_ucu_2024.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class AlumnoController {

    @Autowired
    AlumnoService as;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody Alumno alumni) {
        AuthResponse resultado = as.register(alumni);
        return ResponseEntity.ok(resultado);
    }


}
