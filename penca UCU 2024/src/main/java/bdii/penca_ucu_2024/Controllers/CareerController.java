package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Career;
import bdii.penca_ucu_2024.Classes.Prediction;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;
import bdii.penca_ucu_2024.JSONClasses.LoginRequest;
import bdii.penca_ucu_2024.Services.CareerService;
import bdii.penca_ucu_2024.Services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CareerController {

    @Autowired
    CareerService cs;

    @PostMapping("/career/")
    public boolean insert(@RequestBody Career career) {
        return cs.insert(career);
    }

    @GetMapping("/career/")
    public List<Career> getCareers() {
        return cs.get();
    }

    @GetMapping("/career/alumn/")
    public Career getCareerByAlumn(@RequestHeader("correo_estudiantil") String correo_estudiantil) {
        return cs.getCareer(correo_estudiantil);
    }
}
