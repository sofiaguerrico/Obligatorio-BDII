
package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Alumno;
import bdii.penca_ucu_2024.JSONClasses.UserRequest;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;
import bdii.penca_ucu_2024.Services.AlumnoService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AlumnoController {

    @Autowired
    AlumnoService as;


    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody UserRequest alumni) {
        AuthResponse resultado = as.register(alumni);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/alumnos/getAll")
    public ResponseEntity<List<Alumno>> getAll() {
        List<Alumno> alumnos = as.findAll();
        return ResponseEntity.ok(alumnos);
    }

}
