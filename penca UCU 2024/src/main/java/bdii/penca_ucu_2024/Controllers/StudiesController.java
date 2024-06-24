package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Career;
import bdii.penca_ucu_2024.Classes.Studies;
import bdii.penca_ucu_2024.Services.StudiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudiesController {

    @Autowired
    private StudiesService ss;

    @GetMapping("/career/alumn/")
    public Career getCareerByAlumn(@RequestHeader("correo_estudiantil") String correo_estudiantil) {
        return ss.getCareer(correo_estudiantil);
    }

    @GetMapping("/careersalumns/")
    public List<Studies> careersAlumns() {
        return ss.careersAlumn();
    }

    @PostMapping("/setStudies")
    public ResponseEntity<Studies> setStudies(@RequestBody Studies studies) {
        Studies s = ss.setStudies(studies);
        if (s == null) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(s);
    }

}
