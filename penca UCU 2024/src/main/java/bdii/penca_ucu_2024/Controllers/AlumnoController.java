
package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.JSONClasses.AlumnoRequest;
import bdii.penca_ucu_2024.Services.AlumnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AlumnoController {

    @Autowired
    AlumnoService as;


    @PostMapping("/register")
    public ResponseEntity<Boolean> register(@RequestBody AlumnoRequest alumni) {

        Boolean resultado = as.register(alumni.getAlumni().getCI(), alumni.getAlumni().getNombre_alumno(),alumni.getAlumni().getApellido_alumno(),alumni.getAlumni().getGenero_alumno(),alumni.getAlumni().getCelular_alumno(), alumni.getAlumni().getCarrera(),alumni.getAlumni().getCorreo_estudiantil(),alumni.getAlumni().getCampeon(),alumni.getAlumni().getSubcampeon(),alumni.getPassword());
        return new ResponseEntity<>(resultado, HttpStatus.OK);
    }
}
