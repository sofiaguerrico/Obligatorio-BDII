package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.JSONClasses.AuthResponse;
import bdii.penca_ucu_2024.Services.EquipoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class EquipoController {

    @Autowired
    EquipoService es;


    @GetMapping("/equipo")
    public ResponseEntity<AuthResponse> getAllEquipos() {
        return ResponseEntity.ok((AuthResponse) es.get());
    }
}
