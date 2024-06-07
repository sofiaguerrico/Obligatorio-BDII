package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Alumn;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;
import bdii.penca_ucu_2024.Services.AlumnService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class AlumnController {

    @Autowired
    AlumnService as;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody Alumn alumni) {
        AuthResponse resultado = as.register(alumni);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/points/")
    public List<Alumn> getPoints() {
        return as.getAllPoints();
    }

    @GetMapping("/correos/")
    public List<String> getCorreos() {
        return as.getCorreos();
    }

}
