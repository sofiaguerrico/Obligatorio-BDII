package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Alumno;
import bdii.penca_ucu_2024.Services.AlumnoService;
import bdii.penca_ucu_2024.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class AdminController {

    @Autowired
    UserService userService;
    @Autowired
    AlumnoService as;

    @GetMapping("/admin/getAll")
    public ResponseEntity<Object> getAll() {
        if(userService.isAdmin()){
            List<Alumno> alumnos = as.findAll();
            return ResponseEntity.ok(alumnos);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No tienes permiso para acceder a este recurso.");
    }

}
