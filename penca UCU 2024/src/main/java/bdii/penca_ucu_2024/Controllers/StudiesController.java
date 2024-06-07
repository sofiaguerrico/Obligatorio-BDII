package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Career;
import bdii.penca_ucu_2024.Classes.Studies;
import bdii.penca_ucu_2024.Services.StudiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

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

}
